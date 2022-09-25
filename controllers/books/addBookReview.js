const { book: service } = require("../../service");

const addBookReview = async (req, res) => {
    const { _id } = req.user;
    const result = await service.addBookReview(_id, req.body);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = addBookReview;