const { Book } = require("../../models/book");

const addBookReview = async (bookId, newBook) => {
    try {
        const data = await Book.findByIdAndUpdate({ _id: bookId }, { ...newBook }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBookReview;