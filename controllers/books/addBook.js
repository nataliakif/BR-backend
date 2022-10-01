const { book: service } = require("../../service");

const addBook = async (req, res) => {
    const { _id } = req.user;
    const duplicatedBook = await service.findDuplicate(req.body, _id);
    if (duplicatedBook) {
        throw new Error("Owner already has such book");
    }
    const result = await service.addBook(req.body, _id);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result 
        }
    });
};

module.exports = addBook;