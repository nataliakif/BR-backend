const { planning:service } = require("../../service/");

const updatePlanningPages = async (req, res) => {
    const { _id } = req.user;
    const { planningId } = req.params;
    const newPlanning = req.body;
    const planning = await service.getPlanningById(planningId, _id);
     if (!planning) {
        throw new Error(`Planning with such id=${planningId} was not found`);
    };
    const result = await service.updatePlanningPages(_id, planningId, newPlanning);
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updatePlanningPages;