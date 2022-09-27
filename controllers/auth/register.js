const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { nanoid } = require("nanoid");
const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Provided email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    confirmPassword: hashPassword,
    verificationToken,
  });
  const mailVerification = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank" >Нажмите для подтверждения email</a>`,
  };
  await sendEmail(mailVerification);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: result.name,
        email: result.email,
        verificationToken,
      },
    },
  });
};
module.exports = register;
