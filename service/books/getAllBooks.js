const { Book } = require("../../models/book");

const getAllBooks = async (_id) => {
    try {
        const data = await Book.find({ owner: _id });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getAllBooks;