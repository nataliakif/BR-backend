const { Planning } = require("../../models/planning");

const getPlanningByOwner = async (_id) => {
  console.log(_id);
  try {
    const data = await Planning.findOne({ owner: _id }).populate("books");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getPlanningByOwner;
