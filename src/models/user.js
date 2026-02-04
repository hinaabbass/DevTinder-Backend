const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please provide a valid email address",
      },
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // prevents password from being returned in queries
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol",
      },
    },

    age: {
      type: Number,
      min: [18, "Age must be atleat 18 years"],
      max: [120, "Age seems invalid"],
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other",
      },
    },
    photourl: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true,
          });
        },
        message: "Please provide a valid profile image URL",
      },
    },

    about: {
      type: String,
      trim: true,
      maxlength: [500, "About section cannot exceed 500 characters"],
    },

    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 20;
        },
        message: "Skills cannot exceed 20 items",
      },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("User", userSchema);
