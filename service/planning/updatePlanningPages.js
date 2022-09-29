const { Planning } = require("../../models/planning");

const updatePlanningPages = async (id,planningId, planning) => {
  try {
    const data = await Planning.findByIdAndUpdate(
      { _id: planningId, owner: id },
      { ...planning }, { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updatePlanningPages;
