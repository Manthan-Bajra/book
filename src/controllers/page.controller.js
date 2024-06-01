const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pageService = require('../services/page.service');

const getPage = catchAsync(async (req, res) => {
    const page = await pageService.getPage(req.params.pageId);
    res.status(httpStatus.CREATED).send(page);
  });

const createPage = catchAsync(async (req, res) => {
  const page = await pageService.createPage(req.body);
  res.status(httpStatus.CREATED).send(page);
});

const updatePage = catchAsync(async (req, res) => {
    const page = await pageService.updatePage(req.body);
    res.status(httpStatus.CREATED).send(page);
  });

const listPage = catchAsync(async (req, res) => {
  const {bookId,sthanId,chapterId,shlokId,sortKey, sortOrder, limit, page,search} = req.body;
  const result = await pageService.listPage(bookId,sthanId,chapterId,shlokId,sortKey, sortOrder, limit, page,search);
  res.send(result);
});

const deletePage = catchAsync(async (req, res) => {
  await pageService.deletePageById(req.params.pageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getPage,
  createPage,
  listPage,
  deletePage,
  updatePage,
};
