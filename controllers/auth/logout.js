const { User } = require("../../models/user");
// const { Session } = require("../../models/sessionModel");
const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null, refreshToken: null });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Logout success",
    },
  });
};

module.exports = logout;
