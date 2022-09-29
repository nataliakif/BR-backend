const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
const { Session } = require("../../models/sessionModel");
const { SECRET_KEY } = process.env;

const refreshTokens = async (req, res) => {
  const authorizationHeader = req.get("Authorization");

  if (authorizationHeader) {
    throw RequestError(400, "No token provided");
  }
  const activeSession = await Session.findById(req.body.sid);

  if (!activeSession) {
    throw RequestError(404, "Invalid session");
  }

  const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
  const verifyPayload = jwt.verify(reqRefreshToken, SECRET_KEY);
  if (!verifyPayload) {
    await Session.findByIdAndDelete(req.body.sid);
    throw RequestError(401, "Unauthorized");
  }

  const user = await User.findById(verifyPayload.uid);
  const session = await Session.findById(verifyPayload.sid);
  if (!user) {
    throw RequestError(404, "Invalid user");
  }
  if (!session) {
    throw RequestError(404, "Invalid session");
  }
  await Session.findByIdAndDelete(verifyPayload.sid);
  const newSession = await Session.create({
    uid: user._id,
  });
  const payload = {
    uid: user._id,
    sid: newSession._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  res.status(200).json({
    data: {
      token,
      refreshToken,
      newSid: newSession._id,
    },
  });
};

module.exports = refreshTokens;
