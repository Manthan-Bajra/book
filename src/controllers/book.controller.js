const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bookService = require('../services/book.service');

const getBook = catchAsync(async (req, res) => {
    const book = await bookService.getBook(req.params.bookId);
    res.status(httpStatus.CREATED).send(book);
  });

const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  res.status(httpStatus.CREATED).send(book);
});

const updateBook = catchAsync(async (req, res) => {
    const book = await bookService.updateBook(req.body);
    res.status(httpStatus.CREATED).send(book);
  });

const listBook = catchAsync(async (req, res) => {
  const {sortKey, sortOrder, limit, page,search} = req.body;
  const result = await bookService.listBook(sortKey, sortOrder, limit, page,search);
  res.send(result);
});

const listNoLimitBook = catchAsync(async (req, res) => {
    const {search} = req.body;
    const result = await bookService.listNoLimitBook(search);
    res.send(result);
  });

const deleteBook = catchAsync(async (req, res) => {
  await bookService.deleteBookById(req.params.bookId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getBook,
  createBook,
  listBook,
  deleteBook,
  updateBook,
  listNoLimitBook,
};
