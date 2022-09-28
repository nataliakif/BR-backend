const { User } = require("../../models/user");

const getUserInfo = async (_id) => {
    try {
        const data = await User.findOne({ _id });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getUserInfo;