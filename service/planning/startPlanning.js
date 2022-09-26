const { User } = require("../../models/user");

const addBook = async ( body, id ) => {
    try {
        const data = await User.findOneAndUpdate({ owner: id }, { ...body }, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addBook;