const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const restorePassword = require("./restorePassword");
// const managePages = require("./managePages/");
const refreshTokens = require("./refreshTokens");
const getUserInfo = require("./getUserInfo");

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
  restorePassword,
  // managePages,
  getUserInfo,
  refreshTokens,
};
