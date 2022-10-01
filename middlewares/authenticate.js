const { RequestError } = require("../helpers");
const { User } = require("../models/user");
// const { Session } = require("../../models/sessionModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } = process.env;
const authenticate = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    return next(RequestError(411, "No header authorization provided"));
  }
  try {
    const acessToken = authorizationHeader.replace("Bearer ", "");
    const payload = jwt.verify(acessToken, SECRET_KEY);

    if (!payload) {
      throw RequestError(401, "Unauthorized");
    }

    const user = await User.findById(payload.uid);
    // const session = await Session.findById(payload.sid);

    if (!user) {
      throw RequestError(400, "Invalid user");
    }

    // if (!session) {
    //   throw RequestError(400, "Invalid session");
    // }

    const isTokenExpired = (token) => {
      return (
        Date.now() >=
        JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
          ACCESS_TOKEN_SECRET_KEY
      );
    };

    const TokenExpired = isTokenExpired(acessToken);
    if (TokenExpired) {
      throw RequestError(401, "Token is expired");
    }

    req.user = user;
    next();
  } catch (error) {
    throw next(RequestError(401, error.message));
  }
};
module.exports = authenticate;
