const httpStatus = require('http-status');
const Plan = require('../models/plan.model');
const ApiError = require('../utils/ApiError');
const AWSManager = require("../utils/aws");

const getPlan = async (planId) => {
    const plan = await Plan.findOne({_id:planId,isDeleted:false});
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    await plan.save();
    return plan;
  };

const createPlan = async (userBody) => {
  const {image,name,description,discount,amount,startDate,endDate,tenure} = userBody;
  let data = {name,description,tenure,discount,amount,startDate,endDate}
  if(image){
      const signedImage = await AWSManager.createUrl(image,AWSManager.planFolderPath);
      data.image=signedImage;
      data.imageName=image;
  }
  let plan = await Plan.create(data);
  return plan;
};

const updatePlan = async (userBody) => {
    const {planId,image,name,description,discount,amount,startDate,endDate,tenure} = userBody;
    let plan = await getPlan(planId);
    if(image && plan.imageName != image){
        const signedImage = await AWSManager.createUrl(image,AWSManager.planFolderPath);
        plan.image = signedImage;
        plan.imageName = image;
    }
    plan.name=name;
    plan.description=description;
    plan.discount=discount;
    plan.amount=amount;
    plan.startDate=startDate;
    plan.endDate=endDate;
    plan.tenure=tenure;

    await plan.save();
    return plan;
  };

const listPlan = async (type="",sortKey = 'createdAt', sortOrder = 'DESC', limit = 10, page = 1,search="") => {
    let sortCriteria = {};
    let listFilter = {
        isDeleted:false,
    }

    if(type=="APP"){
        listFilter.isActive=true;
    }

    sortCriteria[sortKey] = sortOrder;

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const totalPlans = await Plan.find(listFilter).countDocuments();

    const plans = await Plan.find(listFilter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortCriteria);

    const planList = {
        limit: limit,
        page: page,
        totalPages: Math.ceil(totalPlans / limit),
        totalResult: totalPlans,
        results: plans,
    };

    return planList;
};

const deletePlanById = async (planId) => {
  const plan = await getPlan(planId);
  if (plan.isActive) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan still active, Please deactivate to delete.');
  }
  plan.isDeleted = true;
  await plan.save();
  return plan;
};

const activePlanById = async (planId) => {
    const plan = await getPlan(planId);
    plan.isActive = !plan.isActive;
    await plan.save();
    return plan;
  };

module.exports = {
    createPlan,
    updatePlan,
    getPlan,
    listPlan,
    deletePlanById,
    activePlanById,
};
