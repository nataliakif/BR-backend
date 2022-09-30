const bcryptjs = require("bcryptjs");
const { User } = require("../../models/user");
const { Session } = require("../../models/sessionModel");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User email or password is wrong");
  }
  const comparePassword = await bcryptjs.compare(password, user.password);

  if (!comparePassword) {
    throw RequestError(401, "User email or password is wrong");
  }

  if (!user.verify) {
    throw RequestError(400, "Email not verify");
  }
  const newSession = await Session.create({
    uid: user._id,
  });
  const payload = {
    uid: user._id,
    sid: newSession._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  await User.findByIdAndUpdate(
    user._id,
    { token, refreshToken },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        token,
        refreshToken,
      },
    },
  });
};
module.exports = login;
