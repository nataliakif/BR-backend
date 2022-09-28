const { User } = require("../../models/user");

const managePages = async (id, user) => {
    try {
        const data = await User.findByIdAndUpdate({_id:id}, { ...user }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = managePages;