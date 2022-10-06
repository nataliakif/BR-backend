const express = require("express");
const { books: ctrl } = require("../../controllers");
const {
  validationBody,
  ctrlWrapper,
  authenticate,
  checkProtocol,
} = require("../../middlewares");
const { joiSchema } = require("../../models/book");

const router = express.Router();

router.get("/", checkProtocol, authenticate, ctrlWrapper(ctrl.getAllBooks));

router.post(
  "/",
  checkProtocol,
  authenticate,
  validationBody(joiSchema),
  ctrlWrapper(ctrl.addBook)
);

router.put(
  "/:bookId",
  checkProtocol,
  authenticate,
  validationBody(joiSchema),
  ctrlWrapper(ctrl.addBookReview)
);

module.exports = router;
