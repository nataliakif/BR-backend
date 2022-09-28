const { planning:service } = require("../../service/");

const updatePlanningPages = async (req, res) => {
    const { _id } = req.user;
    const { planningId, date, time, amountOfPages } = req.body;
    const planning = await service.getPlanningById(planningId, _id);
     if (!planning) {
        throw new Error(`Planning with such ${planningId} was not found`);
    };
    planning.readStatistics.push({ date, time, amountOfPages });
    const result = await service.updatePlanningPages(_id,planningId, planning);
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updatePlanningPages;