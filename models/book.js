const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookSchema = Schema({
    bookTitle: {
        type: String,
        required: [true, 'Set title for book'],
    },
    author: {
        type: String,
        required: [true, 'Set book author'],
    },
    publicationDate: {
        type: Number,
        required: [true, 'Set book publication date'],
    },
    amountOfPages: {
        type: Number,
        required: [true, 'Set amount of pages for the book'],
    },
    status: {
        type: String,
        enum: ["alreadyRead", "readingNow", "goingToRead"],
        default: "goingToRead"
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    resume: {
        type: String,
        default:""
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
    bookTitle: Joi.string().required(),
    author: Joi.string().required(),
    publicationDate: Joi.number().min(1).required(),
    amountOfPages: Joi.number().min(1).required(),
    status: Joi.string().default("goingToRead").valid("alreadyRead", "readingNow", "goingToRead"),
    rating: Joi.number().default(0).valid(0, 1, 2, 3, 4, 5),
    resume: Joi.string().default("")
});

const reviewJoiSchema = Joi.object({
    rating: Joi.number().valid(0, 1, 2, 3, 4, 5).required(),
    resume: Joi.string().default("")
});

const Book = model("book", bookSchema);

module.exports = {
    Book,
    joiSchema,
    reviewJoiSchema
}