const { planning: service } = require("../../service");

const getPlanningByOwner = async (req, res) => {
  const { _id } = req.user;
  const result = await service.getPlanningByOwner(_id);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getPlanningByOwner;
