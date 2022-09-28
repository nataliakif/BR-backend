const { Planning } = require("../../models/planning");

const getPlanningById = async (planningId, _id) => {
  try {
    const data = await Planning.findOne({_id:planningId, owner:_id});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getPlanningById;
