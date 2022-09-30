const { planning:service } = require("../../service/");

const updatePlanningPages = async (req, res) => {
    const { _id } = req.user;
    const { planningId } = req.params;
    const { date, time, amountOfPages } = req.body;
    const planning = await service.getPlanningById(planningId, _id);
     if (!planning) {
        throw new Error(`Planning with such ${planningId} was not found`);
    };
    let readStatistics;
    readStatistics = planning.readStatistics;
    readStatistics.push({ date, time, amountOfPages });
    const result = await service.updatePlanningPages(_id, planningId, readStatistics);
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updatePlanningPages;