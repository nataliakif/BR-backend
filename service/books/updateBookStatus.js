const { Book } = require('../../models/book');

const updateBookStatus = async (bookId, ownerId) => {
  try {
    const data = await Book.findByIdAndUpdate(
      { _id: bookId, owner: ownerId },
      { status:"finished" }, { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateBookStatus;
