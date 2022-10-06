const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

const { usersControllers } = require("../../controllers");

const {
  validationBody,
  authenticate,
  checkProtocol,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post(
  "/register",
  checkProtocol,
  validationBody(schemas.registerSchema),
  ctrlWrapper(usersControllers.register)
);

router.post(
  "/login",
  checkProtocol,
  validationBody(schemas.loginSchema),
  ctrlWrapper(usersControllers.login)
);
router.get(
  "/logout",
  checkProtocol,
  authenticate,
  ctrlWrapper(usersControllers.logout)
);
router.get("/google", checkProtocol, ctrlWrapper(usersControllers.googleAuth));
router.get(
  "/google-redirect",
  checkProtocol,
  ctrlWrapper(usersControllers.googleRedirect)
);
router.post(
  "/refresh",
  checkProtocol,
  ctrlWrapper(usersControllers.refreshTokens)
);
router.post(
  "/restorePassword",
  checkProtocol,
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(usersControllers.restorePassword)
);
router.get(
  "/user",
  checkProtocol,
  authenticate,
  ctrlWrapper(usersControllers.getUserInfo)
);
module.exports = router;
