const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

const { usersControllers } = require("../../controllers");

const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(usersControllers.register)
);
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(usersControllers.login)
);
router.get("/logout", authenticate, ctrlWrapper(usersControllers.logout));
module.exports = router;
