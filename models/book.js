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
        enum: ["finished", "reading_now", "going_to_read"],
        default: "going_to_read"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5, 
        default:0
    },
    review: {
        type: String,
        default:null
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
    publicationDate: Joi.number().min(1).max(2022).required(),
    amountOfPages: Joi.number().min(1).required(),
    status: Joi.string().default("going_to_read").valid("finished", "reading_now", "going_to_read"),
    rating: Joi.number().default(0).min(0).max(5),
    review: Joi.string().default("")
});

const joiBookReview = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    review: Joi.string().default("")
})

const Book = model("book", bookSchema);

module.exports = {
    Book,
    joiSchema,
    joiBookReview
}