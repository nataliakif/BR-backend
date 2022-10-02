/* const { NotFound } = require("http-errors"); */
const { planning: service } = require("../../service");

const getPlanningByOwner = async (req, res) => {
  const { _id } = req.user;
  const result = await service.getPlanningByOwner(_id);
  /* if (!result) {
        throw new NotFound(404, "Planning was not found");
    }; */
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getPlanningByOwner;
