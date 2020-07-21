const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const schema = new Schema({
  id: { type: Number, createIndexes: { unique: true } },
  name: { type: String },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    createIndexes: { unique: true },
  },
  password: { type: String },
  verificationCode: {
    code: { type: Number },
    deadline: { type: Date },
  },
  facebookProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
});

schema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

schema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

schema.statics.upsertFbUser = function (
  accessToken,
  refreshToken,
  profile,
  cb
) {
  var that = this;
  return this.findOne(
    {
      "facebookProvider.id": profile.id,
    },
    function (err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken,
          },
        });

        newUser.save(function (error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

const Model = mongoose.model("User", schema);

module.exports = Model;
