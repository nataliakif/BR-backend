const express = require('express');
const { books: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/book");

const router = express.Router()

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addBook));


module.exports = router;