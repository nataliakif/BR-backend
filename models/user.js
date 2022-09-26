const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
// Mongoose userSchema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    pagesRead: [{ date: String, time:String, amountOfPages: String }]
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSchemaValidationErrors);

// Joi register/login schema
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  pagesRead: Joi.array().items(Joi.string())
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const pagesSchema = Joi.object({
  pagesRead: Joi.array().items(Joi.string())
});

const schemas = {
  registerSchema,
  loginSchema,
  pagesSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
