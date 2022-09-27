const { user: service } = require("../../service");

const managePages = async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        throw new Error("User not authorized");
    };
    if (!req.body) {
        throw new Error("Check for input data");
    }
    const result = await service.managePages(req.body, _id);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = managePages;