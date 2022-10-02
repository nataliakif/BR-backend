const { planning } = require("../../service");

const startPlanning = async (req, res) => {
  const { _id } = req.user;

  const result = await planning.startPlanning(req.body, _id);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = startPlanning;
