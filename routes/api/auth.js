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
router.get(
  "/logout",
  authenticate,
  ctrlWrapper(usersControllers.authorization),
  ctrlWrapper(usersControllers.logout)
);
router.get("/google", ctrlWrapper(usersControllers.googleAuth));
router.get("/google-redirect", ctrlWrapper(usersControllers.googleRedirect));
router.post("/refreshtoken", ctrlWrapper(usersControllers.refreshTokens));
router.get(
  "/verify/:verificationToken",
  ctrlWrapper(usersControllers.verifyEmail)
);
router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(usersControllers.resendVerifyEmail)
);
router.get("/user", authenticate, ctrlWrapper(usersControllers.getUserInfo));
module.exports = router;
