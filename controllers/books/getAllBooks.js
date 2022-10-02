const { book: service } = require("../../service");

const getAllBooks = async (req, res) => {
  const { _id } = req.user;
  const books = await service.getAllBooks(_id);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: books,
    },
  });
};

module.exports = getAllBooks;
