const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "Not found user");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Email verify success",
    },
  });
};
module.exports = verifyEmail;
