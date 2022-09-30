const { Planning } = require("../../models/planning");

const updatePlanningPages = async (ownerId, planningId, readStatistics) => {
  try {
    const data = await Planning.findOneAndUpdate(
      { _id: planningId, owner: ownerId },
      { readStatistics }, { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updatePlanningPages;
