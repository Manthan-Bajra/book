const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const chapterService = require('../services/chapter.service');

const getChapter = catchAsync(async (req, res) => {
    const chapter = await chapterService.getChapter(req.params.chapterId);
    res.status(httpStatus.CREATED).send(chapter);
  });

const createChapter = catchAsync(async (req, res) => {
  const chapter = await chapterService.createChapter(req.body);
  res.status(httpStatus.CREATED).send(chapter);
});

const updateChapter = catchAsync(async (req, res) => {
    const chapter = await chapterService.updateChapter(req.body);
    res.status(httpStatus.CREATED).send(chapter);
  });

const listChapter = catchAsync(async (req, res) => {
  const {bookId,sthanId,sortKey, sortOrder, limit, page,search} = req.body;
  const result = await chapterService.listChapter(bookId,sthanId,sortKey, sortOrder, limit, page,search);
  res.send(result);
});

const listNoLimitChapter = catchAsync(async (req, res) => {
    const {bookId,sthanId,search} = req.body;
    const result = await chapterService.listNoLimitChapter(bookId,sthanId,search);
    res.send(result);
  });
  
const deleteChapter = catchAsync(async (req, res) => {
  await chapterService.deleteChapterById(req.params.chapterId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getChapter,
  createChapter,
  listChapter,
  deleteChapter,
  updateChapter,
  listNoLimitChapter,
};
