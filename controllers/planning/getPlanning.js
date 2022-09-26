const { planning: service } = require("../../service");

const getPlanningById = async (req, res) => {
    const { planningId } = req.params;
    const result = await service.getPlanningById(planningId);
    if (!result) {
        throw new Error("Not found");
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