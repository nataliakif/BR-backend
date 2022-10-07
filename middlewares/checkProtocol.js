const { RequestError } = require("../helpers");

const checkProtocol = (req, res, next) => {
  // if (req.protocol === "http") {
  //   throw RequestError(404, "Not found");
  // }
  next();
};
module.exports = checkProtocol;
