const { Book } = require("../../models/book");

const getBookByBookId = async (bookId) => {
    try {
        const data = await Book.findOne({ _id: bookId});
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getBookByBookId;