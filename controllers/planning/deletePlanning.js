const { NotFound } = require('http-errors');
const { planning, book } = require("../../service");

const deletePlanning = async (req, res) => {
    const { planningId } = req.params;
    const { _id } = req.user;
    const existingPlan = await planning.getPlanningById(planningId, _id);
    if (!existingPlan) {
        throw new NotFound(404, `Planning with such id=${planningId} was not found`);
    }
    let allBooks = existingPlan.books;
    for (const item of allBooks) {
        await book.updateBookStatus(item.id, _id);
    }
    const result = await planning.deletePlanning(planningId);
    if (!result) {
        throw new Error("Server Error");
    };
    res.json({
        status: "success",
        code: 200,
        message: "book deleted",
        data: {
            result
        }
    });
};

module.exports = deletePlanning;