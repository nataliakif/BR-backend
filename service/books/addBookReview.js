const { Book } = require("../../models/book");

const addBookReview = async (bookId, rating, review) => {
    try {
        const data = await Book.findByIdAndUpdate({ _id: bookId }, { rating, review }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBookReview;