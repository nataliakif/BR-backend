const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
// const { Session } = require("../../models/sessionModel");
const {
  SECRET_KEY,
  SECRET_REFRESH_KEY,
  ACCESS_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN,
} = process.env;

const refresh = async (req, res) => {
  const reqRefresh = req.body.refreshToken;
  if (!reqRefresh) {
    throw RequestError(411, "No provided refresh token");
  }

  try {
    const { uid } = jwt.verify(reqRefresh, SECRET_REFRESH_KEY);

    const user = await User.findById(uid);

    if (!user) {
      throw RequestError(404, "Not found user");
    }
    const payload = {
      uid: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRESIN,
    });
    const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRESIN,
    });
    await User.findByIdAndUpdate(user._id, { token, refreshToken });
    res.status(200).json({
      code: 200,
      status: "success",
      data: {
        token,
        refreshToken,
      },
    });
  } catch (err) {
    throw RequestError(400, "No refresh token provided");
  }
};
module.exports = refresh;
