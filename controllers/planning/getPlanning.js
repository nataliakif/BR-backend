const { planning: service } = require("../../service");

const getPlanningById = async (req, res) => {
    const { _id } = req.user;
    const { planningId } = req.params;
    const result = await service.getPlanningById(planningId, _id);
    if (!result) {
        throw new Error("Planning was not found");
    };
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = getPlanningById;