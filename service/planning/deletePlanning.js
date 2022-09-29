const { Planning } = require("../../models/planning");

const deletePlanning = async (id) => {
    try {
        const data = await Planning.findOneAndRemove(id);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = deletePlanning;