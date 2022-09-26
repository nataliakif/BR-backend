const express = require('express');
const { books: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema, joiBookReview } = require("../../models/book");

const router = express.Router()

router.post('/', authenticate, validation(joiSchema), ctrlWrapper(ctrl.addBook));

router.post('/review', authenticate, validation(joiBookReview), ctrlWrapper(ctrl.addBookReview));


module.exports = router;