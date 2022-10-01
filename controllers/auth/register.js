const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const { RequestError, sendEmail } = require("../../helpers");
const {
  FRONTEND_URL,
  SECRET_KEY,
  SECRET_REFRESH_KEY,
  REFRESH_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_EXPIRESIN,
} = process.env;

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Provided email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashPassword,
    confirmPassword: hashPassword,
  });
  const newUser = await User.findOne({ email });

  const payload = {
    uid: newUser._id,
    // sid: newSession._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRESIN,
  });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRESIN,
  });
  const mailVerification = {
    to: email,
    subject: "Спасибо за регистрацию на нашем сайте",
    html: `<a href="${FRONTEND_URL}" target="_blank">Спасибо за регистрацию на нашем сайте</a>`,
  };
  await sendEmail(mailVerification);
  await User.findByIdAndUpdate(newUser._id, { token, refreshToken });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        token,
        refreshToken,
      },
    },
  });
};
module.exports = register;
