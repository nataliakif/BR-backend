const { Planning } = require("../../models/user");

const startPlanning = async ( body, id ) => {
    try {
        const data = await Planning.create({ ...body }, { owner: id });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = startPlanning;