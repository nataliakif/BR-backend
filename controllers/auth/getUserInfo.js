const { user: service } = require("../../service");

const getUserInfo = async (req, res) => {
    const { _id } = req.user;
    const user = await service.getUserInfo(_id);
    if (!user) {
        throw new Error(`User with such ${_id} was not found`);
    }
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user
        }
    });
};

module.exports = getUserInfo;