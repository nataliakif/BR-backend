const { Book } = require("../../models/book");

const addBook = async ( body, id ) => {
    try {
        const data = await Book.create({ ...body, owner: id });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBook;