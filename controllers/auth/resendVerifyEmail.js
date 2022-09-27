const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found user");
  }
  if (user.verify) {
    throw RequestError(400, "User alredy verify");
  }
  const mailVerification = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="${BASE_URL}/auth/verify/${user.verificationToken}" target="_blank" >Нажмите для подтверждения email</a>`,
  };
  await sendEmail(mailVerification);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Email verify resend",
    },
  });
};
module.exports = resendVerifyEmail;
