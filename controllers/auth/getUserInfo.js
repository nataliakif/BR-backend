const { RequestError } = require("../../helpers");
const { user: service } = require("../../service");

const getUserInfo = async (req, res) => {
  const { _id } = req.user;

  const user = await service.getUserInfo(_id);
  if (!user) {
    throw RequestError(404, `User with such ${_id} was not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user,
    },
  });
};

module.exports = getUserInfo;
