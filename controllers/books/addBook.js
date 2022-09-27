const { book: service } = require("../../service");

const addBook = async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        throw new Error("User not authorized");
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