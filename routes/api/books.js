const express = require('express');
const { books: ctrl } = require('../../controllers');
const { validationBody, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema, joiBookReview } = require("../../models/book");

const router = express.Router()

router.post('/', authenticate, validationBody(joiSchema), ctrlWrapper(ctrl.addBook));

router.post('/review', authenticate, validationBody(joiBookReview), ctrlWrapper(ctrl.addBookReview));


module.exports = router;