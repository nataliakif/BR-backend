const { Book } = require("../../models/book");

const addBookReview = async (id, rating, review) => {
    try {
        const data = await Book.findByIdAndUpdate(id, { rating, review }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBookReview;