const { planning, book } = require("../../service");

const startPlanning = async (req, res) => {
    const { _id } = req.user;
    const { startDate, finishDate, books } = req.body;
    let body = { startDate, finishDate, books };
    if (books.length <= 0) {
        throw new Error("You have not chosen any book");
    };
    const result = await planning.startPlanning(body, _id);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = startPlanning;