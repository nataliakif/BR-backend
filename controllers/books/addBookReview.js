const { book: service } = require("../../service");

const addBookReview = async (req, res) => {
    const { _id, rating, review } = req.body;
    if (!_id) {
        throw new Error("user not authorized")
    }
    const result = await service.addBookReview(_id, rating, review);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = addBookReview;