const { Book } = require("../../models/book");

const addBookReview = async ( body, id ) => {
    try {
        const data = await Book.findByIdAndUpdate(id, { ...body }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBookReview;