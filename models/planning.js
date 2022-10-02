const { Schema, model } = require("mongoose");
const Joi = require("joi");

const planningSchema = Schema(
  {
    startDate: {
      type: String,
      required: [true, "Set start date of planning"],
    },
    finishDate: {
      type: String,
      required: [true, "Set start date of planning"],
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Set books you would like to read"],
        ref: "book",
      },
    ],
    readStatistics: {
      type: Array,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  startDate: Joi.string().required(),
  finishDate: Joi.string().required(),
  books: Joi.array().required(),
  readStatistics: Joi.array(),
});

const Planning = model("planning", planningSchema);

module.exports = {
  Planning,
  joiSchema,
};
