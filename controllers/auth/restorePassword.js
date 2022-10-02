const { User } = require("../../models/user");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const { RequestError, sendEmail } = require("../../helpers");
const { FRONTEND_URL } = process.env;

const restorePassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found user");
  }
  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, {
    password: hashPassword,
  });

  const mailResendPassword = {
    to: email,
    subject: "Restore your Password",
    html: `<b>${newPassword}</b>, <a href="${FRONTEND_URL}/BR-frontend/login" target="_blank">Come back to us:)</a>,`,
  };
  await sendEmail(mailResendPassword);
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "New password has been sent to your email",
    },
  });
  res.redirect(`${FRONTEND_URL}`);
};
module.exports = restorePassword;
