const { user: service } = require("../../service");

const managePages = async (req, res) => {
    const { _id } = req.user;
    const { date, time, amountOfPages } = req.body;
    const user = await service.getUserInfo(_id);
     if (!user) {
        throw new Error(`User with such ${_id} was not found`);
    };
    user.pagesRead.push({ date, time, amountOfPages });
    const result = await service.managePages(_id, user);
    if (!result) {
        throw new Error("Something went wrong on User update");
    };   
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    });
};

module.exports = managePages;