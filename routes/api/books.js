const express = require("express");
const { books: ctrl } = require("../../controllers");
const {
  validationBody,
  ctrlWrapper,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/book");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAllBooks));

router.post(
  "/",
  authenticate,
  validationBody(joiSchema),
  ctrlWrapper(ctrl.addBook)
);

router.put(
  "/:bookId",
  authenticate,
  validationBody(joiSchema),
  ctrlWrapper(ctrl.addBookReview)
);

module.exports = router;
