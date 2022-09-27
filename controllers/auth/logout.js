const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Logout success",
    },
  });
};
module.exports = logout;
