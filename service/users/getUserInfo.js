const { User } = require("../../models");

const getUserInfo = async (id) => {
    try {
        const data = await User.findById(id);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getUserInfo;