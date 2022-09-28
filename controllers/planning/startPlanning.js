const { planning, book } = require("../../service");

const startPlanning = async (req, res) => {
    const { _id } = req.user;
    const { startDate, finishDate, bookId } = req.body;
    const foundBook = await book.findBook(bookId, _id);
    if (!foundBook) {
        throw new Error(`User with id=${_id} does not have book with id=${bookId}`);
    };
    let body = { startDate, finishDate, bookId };
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