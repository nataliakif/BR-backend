const { Book } = require("../../models/book");

const findDuplicate = async (body, id) => {
    try {
        const data = await Book.findOne({
            bookTitle: body.bookTitle,
            author: body.author,
            publicationDate: body.publicationDate,
            amountOfPages:body.amountOfPages,
            owner: id
        });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = findDuplicate;