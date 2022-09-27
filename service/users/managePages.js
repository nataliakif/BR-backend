const { User } = require("../../models/book");

const managePages = async ( body, id ) => {
    try {
        const data = await User.findByIdAndUpdate(id, { ...body });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = managePages;