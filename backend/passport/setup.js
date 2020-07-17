const bcrypt = require("bcryptjs");
const User = require("./../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email })
      .then((user) =>
        bcrypt.compare(password, user.passport, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "wrong password" });
          }
        })
      )
      .catch((err) => {
        return done(null, false, { message: err });
      });
  })
);

// passport.authenticate("local", (err, user, info) => {
//   if (err) {
//     return res.status(400).json({ errors: err });
//   }
//   if (!user) {
//     return res.status(400).json({ errors: "No users found" });
//   }
//   req.logIn(user, (err) => {
//     if (err) {
//       return res.status(400).json({ errors: err });
//     }
//     return res.status(200).json({ success: true });
//   });
// });
