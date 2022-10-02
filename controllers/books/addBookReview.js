const { NotFound } = require("http-errors");
const { book: service } = require("../../service");

const addBookReview = async (req, res) => {
  const { bookId } = req.params;
  const newBook = req.body;
  console.log(req.body);
  const book = await service.getBookByBookId(bookId);
  if (!book) {
    throw new NotFound(404, "There is no book with such id.");
  }
  const result = await service.addBookReview(bookId, newBook);
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = addBookReview;
