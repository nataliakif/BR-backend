const { Planning } = require("../../models");

const getPlanningById = async (id) => {
    try {
        const data = await Planning.findById(id);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getPlanningById;