const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const sthanService = require('../services/sthan.service');

const getSthan = catchAsync(async (req, res) => {
    const sthan = await sthanService.getSthan(req.params.sthanId);
    res.status(httpStatus.CREATED).send(sthan);
  });

const createSthan = catchAsync(async (req, res) => {
  const sthan = await sthanService.createSthan(req.body);
  res.status(httpStatus.CREATED).send(sthan);
});

const updateSthan = catchAsync(async (req, res) => {
    const sthan = await sthanService.updateSthan(req.body);
    res.status(httpStatus.CREATED).send(sthan);
  });

const listSthan = catchAsync(async (req, res) => {
  const {bookId,sortKey, sortOrder, limit, page,search} = req.body;
  const result = await sthanService.listSthan(bookId, sortKey, sortOrder, limit, page,search);
  res.send(result);
});

const listNoLimitSthan = catchAsync(async (req, res) => {
    const {bookId,search} = req.body;
    const result = await sthanService.listNoLimitSthan(bookId,search);
    res.send(result);
  });
const deleteSthan = catchAsync(async (req, res) => {
  await sthanService.deleteSthanById(req.params.sthanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getSthan,
  createSthan,
  listSthan,
  deleteSthan,
  updateSthan,
  listNoLimitSthan,
};
