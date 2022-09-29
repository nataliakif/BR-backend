const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const resendVerifyEmail = require("./resendVerifyEmail");
const verifyEmail = require("./verifyEmail");
// const managePages = require("./managePages/");
const refreshTokens = require("./refreshTokens");
const getUserInfo = require("./getUserInfo");
const authorization = require("./authorization");

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
  resendVerifyEmail,
  verifyEmail,
  // managePages,
  getUserInfo,
  refreshTokens,
  authorization,
};
