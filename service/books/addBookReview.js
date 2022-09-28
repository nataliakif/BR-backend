const { Book } = require("../../models/book");

const addBookReview = async (id, book) => {
    try {
        const data = await Book.findByIdAndUpdate({_id:id}, { ...book }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBookReview;