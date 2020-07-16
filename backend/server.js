const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 4000;
const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = require("./database.js");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const mongoose = require("mongoose"),
  User = require("./models/Users");
const { getAllUsers } = require("./database.js");

const databaseName = "recipes";
const databaseUrl = `mongodb://localhost:27017/${databaseName}`;
const jwtSecret =
  "d188544ad6fdb0687a443159b21fd894030a95436ff615846f2ba6f4644a1f91015e85084df1925a082d563cdac5fbfe06efc7a874253503e611743d387970ed";
mongoose.connect(databaseUrl, function (err) {
  if (err) throw err;
  console.log("Successfully connected to MongoDB");
});
app.use(cors());
app.use("/static", express.static("images"));
app.use(express.json());
// var testUser = new User({
//   email: "andrzej@recipes.com",
//   name: "Andrzej Nowak",
//   password: "admin",
// });

// db.insertUser(testUser);
// User.find((err, user) => console.log(user));
// db.populateDatabase();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/api/recipes", authenticateToken, getUser, async (req, res, next) => {
  const recipes = await db.getAllRecipes(res.locals.user.id);
  res.send(recipes);
});

app.get("/api/recipes/:id", async (req, res) => {
  const recipe = await db.getRecipe(req.params.id);
  res.send(recipe);
});

app.delete("/api/recipes/:id", authenticateToken, async (req, res) => {
  console.log(`Deleting recipe with id ${req.params.id}`);
  const recipeToDelete = await db.getRecipe(req.params.id);

  db.deleteRecipe(req.params.id);

  const imageName = recipeToDelete.imageUrl.split("/").pop();

  fs.unlink(`./images/${imageName}`, function (err) {
    if (err) {
      throw err;
    }
  });

  res.send(recipeToDelete);
});

app.get("/api/recipes/random", async (req, res) => {
  const recipes = await db.getAllRecipes();
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  res.send(randomRecipe);
});

app.post(
  "/api/upload",
  authenticateToken,
  getUser,
  upload.single("file"),
  async function (req, res) {
    const recipe = JSON.parse(req.body.json);
    const newRecipe = {
      id: Math.floor(Math.random() * 100000),
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      ingredients: recipe.ingredients,
      preparingSteps: recipe.preparingSteps,
      imageUrl: `http://localhost:4000/static/${req.file.filename}`,
      description: recipe.description,
    };
    const recipeResponse = await db.insertRecipe(newRecipe);
    res.send(recipeResponse);
  }
);

app.post("/api/login", async (req, res, next) => {
  const loginData = req.body;
  let token = null;
  let verificationCode = await new Promise(function (resolve, reject) {
    User.findOne({ email: loginData.email }, function (err, user) {
      if (err || user === null) {
        res.send({ user: undefined, success: false });
        return reject();
      }
      user.comparePassword(loginData.password, function (err, isMatch) {
        if (err) {
          res.send({ user: undefined, success: false });
          return reject();
        } else {
          const responseUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
          };
          res.send({ user: responseUser, success: true });
          const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
          db.addVerificationCode(user.email, code);
          return resolve(code);
        }
      });
    });
  });
  console.log("Verification code generated: ", verificationCode);
});

app.post("/api/login/2fa", async function (req, res) {
  const loginData = req.body;
  const codeFromUser =
    loginData.verificationCode.input1 +
    loginData.verificationCode.input2 +
    loginData.verificationCode.input3 +
    loginData.verificationCode.input4 +
    loginData.verificationCode.input5 +
    loginData.verificationCode.input6;
  User.findOne({ email: loginData.user.email }, function (err, user) {
    if (codeFromUser == user.verificationCode.code) {
      const token = generateAccessToken(loginData.user.email);
      const responseUser = {
        ...loginData.user,
        token: token,
      };
      res.send({ user: responseUser, success: true });
      return;
    } else {
      res.send({ user: loginData.user, success: false });
      return;
    }
  });
});

const generateAccessToken = (email) => {
  return jwt.sign(
    { email: email },
    "d188544ad6fdb0687a443159b21fd894030a95436ff615846f2ba6f4644a1f91015e85084df1925a082d563cdac5fbfe06efc7a874253503e611743d387970ed",
    {
      expiresIn: "1h",
    }
  );
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    "d188544ad6fdb0687a443159b21fd894030a95436ff615846f2ba6f4644a1f91015e85084df1925a082d563cdac5fbfe06efc7a874253503e611743d387970ed",
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      res.locals.user = user;
      next();
    }
  );
}

async function getUser(req, res, next) {
  // const userId = await new Promise(function (resolve, reject) {
  User.findOne({ email: res.locals.user.email }, function (err, user) {
    res.locals.user = user;
    next();
    // return resolve(user.id);
  });
  // });
}

app.put(
  "/api/recipes/:id",
  authenticateToken,
  upload.single("file"),
  async function (req, res) {
    const recipe = JSON.parse(req.body.json);
    const recipeToUpdate = await db.getRecipe(req.params.id);

    const updatedRecipe = {
      ...recipeToUpdate,
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      description: recipe.description,
      ingredients: recipe.ingredients,
      preparingSteps: recipe.preparingSteps,
    };

    db.updateRecipe(updatedRecipe);
    res.send(recipeToUpdate);
  }
);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
