const express = require('express');
const { books: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, reviewJoiSchema } = require("../../models/book");

const router = express.Router()

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addBook));

router.post('/review', validation(reviewJoiSchema), ctrlWrapper(ctrl.addBookReview));

module.exports = router;