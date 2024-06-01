const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const headerService = require('../services/header.service');

const createHeader = catchAsync(async (req, res) => {
  const header = await headerService.createHeader(req.body);
  res.status(httpStatus.CREATED).send(header);
});

const listHeader = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await headerService.listHeader(filter, options);
  res.send(result);
});

const deleteHeader = catchAsync(async (req, res) => {
  await headerService.deleteHeaderById(req.params.headerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHeader,
  listHeader,
  deleteHeader,
};
