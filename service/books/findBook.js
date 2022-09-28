const { Book } = require("../../models/book");

const addBook = async (bookId, ownerId) => {
    try {
        const data = await Book.findOne({ _id: bookId, owner: ownerId });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBook;