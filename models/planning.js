const { Schema, model } = require("mongoose");
const Joi = require("joi");

const planningSchema = Schema({
    startDate: {
        type: String,
        required: [true, 'Set start date of planning']
    },
    finishDate: {
        type: String,
        required: [true, 'Set start date of planning']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
    startDate: Joi.string().required(),
    finishDate: Joi.string().required()
});

const Planning = model("planning", planningSchema);

module.exports = {
    Planning,
    joiSchema
}