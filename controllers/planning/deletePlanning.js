const { planning, book } = require("../../service");

const deletePlanning = async (req, res) => {
    const { planningId } = req.params;
    const { _id } = req.user;
    const existingPlan = await planning.getPlanningById(planningId, _id);
    if (!existingPlan) {
        throw Error(`There is no planning with such id=${planningId}`)
    }
    let allBooks = existingPlan.books;
    for (const item of allBooks) {
        await book.updateBookStatus(item.id, _id);
    }
    const result = await planning.deletePlanning(planningId);
    if (!result) {
        throw new Error("Not found");
    };
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            result
        }
    });
};

module.exports = deletePlanning;