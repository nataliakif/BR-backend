const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
const { Session } = require("../../models/sessionModel");
const jwt = require("jsonwebtoken");
const authorization = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  console.log("NO AUTHORIZ");
  if (!authorizationHeader) {
    throw RequestError(400, "No token provided ");
  }

  const accessToken = authorizationHeader.replace("Bearer ", "");
  const payload = jwt.verify(accessToken, process.env.SECRET_KEY);

  if (!payload) {
    throw RequestError(401, "Unauthorized");
  }

  const user = await User.findById(payload.uid);
  const session = await Session.findById(payload.sid);

  if (!user) {
    throw RequestError(400, "Invalid user");
  }

  if (!session) {
    throw RequestError(400, "Invalid session");
  }

  req.user = user;
  req.session = session;
  next();
};
module.exports = authorization;
