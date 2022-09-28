const { book: service } = require("../../service");

const addBookReview = async (req, res) => {
    const { _id } = req.user;
    const { id, rating, review } = req.body;
    const book = await service.findBook(id, _id);
    console.log(book)
    if (!book) {
        throw new Error(`Book with such id=${id} and such ownerId=${_id} was not found.`);
    };
    book.rating = rating;
    book.review = review;
    console.log(book)
    const result = await service.addBookReview(id, book);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = addBookReview;