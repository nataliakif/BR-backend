const bcryptjs = require("bcryptjs");
const { User } = require("../../models/user");
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

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: user.email,
        token,
      },
    },
  });
};
module.exports = login;
