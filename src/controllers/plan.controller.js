const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const planService = require('../services/plan.service');

const getPlan = catchAsync(async (req, res) => {
    const plan = await planService.getPlan(req.params.planId);
    res.status(httpStatus.CREATED).send(plan);
  });

const createPlan = catchAsync(async (req, res) => {
  const plan = await planService.createPlan(req.body);
  res.status(httpStatus.CREATED).send(plan);
});

const updatePlan = catchAsync(async (req, res) => {
    const plan = await planService.updatePlan(req.body);
    res.status(httpStatus.CREATED).send(plan);
  });

const listPlan = catchAsync(async (req, res) => {
  const {type, sortKey, sortOrder, limit, page,search} = req.body;
  const result = await planService.listPlan(type, sortKey, sortOrder, limit, page,search);
  res.send(result);
});

const deletePlan = catchAsync(async (req, res) => {
  await planService.deletePlanById(req.params.planId);
  res.status(httpStatus.NO_CONTENT).send();
});

const activePlan = catchAsync(async (req, res) => {
    await planService.activePlanById(req.params.planId);
    res.status(httpStatus.NO_CONTENT).send();
  });

module.exports = {
  getPlan,
  createPlan,
  listPlan,
  deletePlan,
  updatePlan,
  activePlan,
};
