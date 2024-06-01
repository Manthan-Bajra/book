const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const shlokService = require('../services/shlok.service');

const getShlok = catchAsync(async (req, res) => {
    const shlok = await shlokService.getShlok(req.params.shlokId);
    res.status(httpStatus.CREATED).send(shlok);
  });

const createShlok = catchAsync(async (req, res) => {
  const shlok = await shlokService.createShlok(req.body);
  res.status(httpStatus.CREATED).send(shlok);
});

const updateShlok = catchAsync(async (req, res) => {
    const shlok = await shlokService.updateShlok(req.body);
    res.status(httpStatus.CREATED).send(shlok);
  });

const listShlok = catchAsync(async (req, res) => {
  const {bookId,sthanId,chapterId,sortKey, sortOrder, limit, page,search} = req.body;
  const result = await shlokService.listShlok(bookId,sthanId,chapterId,sortKey, sortOrder, limit, page,search);
  res.send(result);
});

const listNoLimitShlok = catchAsync(async (req, res) => {
    const {bookId,sthanId,chapterId,search} = req.body;
    const result = await shlokService.listNoLimitShlok(bookId,sthanId,chapterId,search);
    res.send(result);
  });
  
const deleteShlok = catchAsync(async (req, res) => {
  await shlokService.deleteShlokById(req.params.shlokId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getShlok,
  createShlok,
  listShlok,
  deleteShlok,
  updateShlok,
  listNoLimitShlok,
};
