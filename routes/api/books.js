const express = require('express');
const { books: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, joiBookReview } = require("../../models/book");

const router = express.Router()

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addBook));

router.post('/review', validation(joiBookReview), ctrlWrapper(ctrl.addBookReview));


module.exports = router;