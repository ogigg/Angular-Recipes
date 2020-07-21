"use strict";

var passport = require("passport"),
  FacebookTokenStrategy = require("passport-facebook-token"),
  User = require("mongoose").model("User"),
  GoogleTokenStrategy = require("passport-google-token").Strategy;

module.exports = function () {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: "585082242207135",
        clientSecret: "c1d2677c80432337e6ade585a72d34af",
      },

      function (accessToken, refreshToken, profile, done) {
        User.upsertFbUser(accessToken, refreshToken, profile, function (
          err,
          user
        ) {
          return done(err, user);
        });
      }
    )
  );
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID:
          "786468915692-5gifdou8gp0bq94sii363m04ackr2vja.apps.googleusercontent.com",
        clientSecret: "CD_ggFfJcfsKd8fQynT75nqS",
      },
      function (accessToken, refreshToken, profile, done) {
        User.upsertFbUser(accessToken, refreshToken, profile, function (
          err,
          user
        ) {
          return done(err, user);
        });
      }
    )
  );
};
