const { book: service } = require("../../service");

const addBookReview = async (req, res) => {
    const { bookId } = req.params;
    const { rating, review } = req.body;
    const book = await service.getBookByBookId(bookId);
    if (!book) {
        throw new Error(`There is no book with such id=${id}.`);
    };
    const result = await service.addBookReview(bookId, rating, review);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = addBookReview;