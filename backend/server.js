const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 4000;
const fs = require("fs");

const db = require("./database.js");

app.use(cors());
app.use("/static", express.static("images"));
// app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ storage: storage }).single('file')

var recipes = [
  {
    id: 1,
    name: "Caesar salad",
    preparationTime: "45min",
    ingredients: [
      { quantity: "1", name: "romaine lettuce hearts" },
      { quantity: "50 g", name: "olives (pitted)" },
      { quantity: "50 g", name: "cherry tomatoes" },
      { quantity: "50 g", name: "cucumber" },
      { quantity: "3", name: "eggs (divided)" },
      { quantity: "2", name: "anchovy fillets" },
      { quantity: "1", name: "clove garlic" },
      { quantity: "1 tsp", name: "lemon juice" },
      { quantity: "1 tsp", name: "Worcestershire sauce" },
      { quantity: "1 tbsp", name: "mustard" },
      { quantity: "140 ml", name: "olive oil (divided)" },
      { quantity: "20 g", name: "Parmesan" },
      { quantity: "1 tsp", name: "sugar" },
      { quantity: "", name: "salt" },
      { quantity: "", name: "pepper" },
    ],

    preparingSteps: [
      "Preheat the oven to 180'b0C/350'b0F. For the bread chips, cut the baguette into thin slices and distribute on a lined baking tray.",
      "Drizzle the slices with olive oil and bake in preheated oven at 180'b0C/350'b0F for approx. 5 - 7 min. until golden.",
      "For the dressing, cook an egg in boiling water for approx. 2 - 3 min. Gently crack open the egg to remove the egg yolk. Put the parboiled egg yolk into a tall container.",
      "Finely chop anchovy fillets and garlic.",
      "Add chopped anchovy fillets and garlic, lemon juice, Worcestershire sauce, mustard, white balsamic vinegar, and sugar to the egg yolk and mix with a hand blender.",
      "Slowly stir the rest of the olive oil into the egg mixture. By doing this, mayonnaise will start to form. Season with salt and pepper.",
      "Halve olives and tomatoes. Dice cucumber. Wash and dry romaine lettuce hearts and tear into bite-sized pieces.",
      "Poach 2 eggs in hot, but not boiling, water to the desired degree of hardness. For a runny center, approx. 3 - 5 min. is recommended. Transfer to a paper towel to dry.",
      "Mix the lettuce, tomatoes, cucumber, and olives with the dressing and transfer to a plate. Sprinkle the bread chips on top and serve with a poached egg and Parmesan shavings.",
    ],
    imageUrl: "http://localhost:4000/static/caesar-salad-3.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt sit amet augue dignissim bibendum. Suspendisse potenti. Phasellus rutrum risus tortor, vulputate lobortis nibh vestibulum vel. Donec eu malesuada justo, ac aliquam dui. Vivamus vitae dui et lacus lacinia pretium eu at justo. Aenean consequat accumsan mattis. Vivamus pretium sed turpis nec feugiat.",
  },
  {
    id: 2,
    name: "Homestyle Potato Chips",
    preparationTime: "60min",
    ingredients: [
      { quantity: "4", name: "medium potatoes, peeled and sliced paper-thin" },
      { quantity: "3", name: "tablespoons salt" },
      { quantity: "1", name: "quart oil for deep frying" },
    ],

    preparingSteps: [
      "Place potato slices into a large bowl of cold water as you slice. Drain, and rinse, then refill the bowl with water, and add the salt. Let the potatoes soak in the salty water for at least 30 minutes. Drain, then rinse and drain again.",
      "Heat oil in a deep-fryer to 365 degrees F (185 degrees C). Fry potato slices in small batches. Once they start turning golden, remove and drain on paper towels. Continue until all of the slices are fried. Season with additional salt if desired.",
    ],
    imageUrl: "http://localhost:4000/static/potato-chips.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt sit amet augue dignissim bibendum. Suspendisse potenti. Phasellus rutrum risus tortor, vulputate lobortis nibh vestibulum vel. Donec eu malesuada justo, ac aliquam dui. Vivamus vitae dui et lacus lacinia pretium eu at justo. Aenean consequat accumsan mattis. Vivamus pretium sed turpis nec feugiat.",
  },
  {
    id: 3,
    name: "Gingerbread cookies",
    preparationTime: "35min",
    ingredients: [
      { quantity: "3 1/4", name: "cups all-purpose flour" },
      { quantity: "1", name: "tablespoon ground cinnamon" },
      { quantity: "1", name: "tablespoon ground ginger" },
      { quantity: "3/4", name: "teaspoon baking soda" },
      { quantity: "3/4", name: "teaspoon ground cloves" },
      { quantity: "1/2", name: "teaspoon ground nutmeg" },
      { quantity: "1/2 ", name: "teaspoon salt" },
      {
        quantity: "3/4",
        name: "cup unsalted butter, softened to room temperature",
      },
      { quantity: "1/2", name: "cup packed brown sugar" },
      { quantity: "1", name: " large egg" },
    ],

    preparingSteps: [
      "In a large mixing bowl, whisk together flour, cinnamon, ginger, baking soda, cloves, salt and nutmeg. Set aside.",
      "In an electric stand mixer fitted with the paddle attachment (or alternately, you can use a hand mixer and a large mixing bowl), beat the butter and sugar together for 2 minutes on medium-high speed until light and fluffy.  Add in eggs, molasses and vanilla, and beat on medium speed until combined. Reduce mixer speed to low, and gradually add the flour mixture until just combined.",
      "Divide the dough into two equal portions, and form them each into a ball.  Then gently use your hands to flatten each ball into a 1-inch thick disk, wrap tightly in plastic wrap, and chill in the refrigerator for at least 2 hours or overnight.",
      "Once the dough is thoroughly chilled and you’re ready to bake the cookies, heat the oven to 350°F and line a baking sheet with parchment paper; set aside.",
      "Unwrap the dough and place it on a large, lightly-floured hard surface.  Use a floured rolling pin to roll the dough evenly until it is approximately 1/8-inch thick.  Then use your favorite cookie cutters to cut out your desired shapes, re-rolling the dough as needed to cut out more.  Transfer to parchment-covered baking sheets.",
      "Bake for 8 to 10 minutes, or until the cookies are crisp around the edges and on top. Remove from oven and let cool for 5 minutes, then transfer to a wire rack to finish cooling.",
      "Once the cookies are room temperature, feel free to decorate them as desired with the icing (see below) plus any extra sprinkles or candies.  Serve and enjoy immediately, or store in a sealed container for up to 4 days.",
    ],
    imageUrl: "http://localhost:4000/static/Gingerbread-Cookies3.jpg",
    description:
      "This classic cut-out gingerbread cookie recipe is easy to make, perfect for decorating, and always so delicious.",
  },
];

app.get("/api/recipes", (req, res) => {
  res.send(recipes);
});

app.get("/api/recipes/:id", (req, res) => {
  let result = recipes.find((obj) => {
    return obj.id == req.params.id;
  });
  res.send(result);
});
app.delete("/api/recipes/:id", (req, res) => {
  console.log(`Deleting recipe with id ${req.params.id}`);
  const recipeToDeleteIndex = recipes.findIndex(function (i) {
    return i.id == req.params.id;
  });
  const recipeToDelete = recipes[recipeToDeleteIndex];

  const imageName = recipeToDelete.imageUrl.split("/").pop();
  fs.unlink(`./images/${imageName}`, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log("File deleted!");
  });
  // console.log(recipeToDelete)
  recipes.splice(recipeToDeleteIndex, 1);
  res.send(recipeToDelete);
});

app.get("/api/recipes/random", (req, res) => {
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  res.send(randomRecipe);
});

app.post("/api/upload", upload.single("file"), async function (req, res) {
  // console.log(req.body.json);
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
  await db.insert(newRecipe);
  recipes.push(newRecipe);
  console.log(newRecipe);
  res.send(newRecipe);
});

app.put("/api/recipes/:id", upload.single("file"), function (req, res) {
  const recipe = JSON.parse(req.body.json);
  console.log(`Updating recipe with id ${req.params.id}`);
  const recipeToUpdateIndex = recipes.findIndex(function (i) {
    return i.id == req.params.id;
  });

  const recipeToUpdate = recipes[recipeToUpdateIndex];
  const updatedRecipe = {
    ...recipeToUpdate,
    name: recipe.name,
    preparationTime: recipe.preparationTime,
    description: recipe.description,
    ingredients: recipe.ingredients,
    preparingSteps: recipe.preparingSteps,
  };
  const updatedRecipes = [
    ...recipes.slice(0, recipeToUpdateIndex),
    updatedRecipe,
    ...recipes.slice(recipeToUpdateIndex + 1),
  ];
  recipes = updatedRecipes;

  res.send(recipeToUpdate);
});

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
