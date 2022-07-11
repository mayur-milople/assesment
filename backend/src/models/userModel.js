const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  username: {
    type: String,
  },

  phone: {
    type: String,
  },

  image: {
    type: Array,
  },

  registered_at: {
    type: Date,
    default: Date.now,
  },

  login_at: {
    type: Date,
  },

  signed_in_method: {
    type: String,
  },

  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// hash the password
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// generate token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString(), expiresIn: "24h" },
      "mynameisvinodbahadurthapayoutuber"
    );
    this.tokens = this.tokens.concat({ token: token });
    this.login_at = new Date();
    await this.save();

    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("user", userSchema);
