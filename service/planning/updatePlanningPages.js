const { Planning } = require("../../models/planning");

const updatePlanningPages = async (ownerId, planningId, newPlanning) => {
  try {
    const data = await Planning.findOneAndUpdate(
      { _id: planningId, owner: ownerId },
      { ...newPlanning }, { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updatePlanningPages;
