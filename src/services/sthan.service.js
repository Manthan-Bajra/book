const httpStatus = require('http-status');
const Sthan = require('../models/sthan.model');
const ApiError = require('../utils/ApiError');
const AWSManager = require("../utils/aws");

const getSthan = async (sthanId) => {
    const sthan = await Sthan.findOne({_id:sthanId,isDeleted:false});
    if (!sthan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sthan not found');
    }
    await sthan.save();
    return sthan;
  };

const createSthan = async (userBody) => {
  const {image,name,bookId,description} = userBody;
  const signedImage = await AWSManager.createUrl(image,AWSManager.sthanFolderPath);
  return Sthan.create({image:signedImage,imageName:image,bookId,name,description});
};

const updateSthan = async (userBody) => {
    const {sthanId,image,name,description,category} = userBody;
    let sthan = await getSthan(sthanId);
    if(sthan.imageName != image){
        const signedImage = await AWSManager.createUrl(image,AWSManager.sthanFolderPath);
        sthan.image = signedImage;
        sthan.imageName = image;
    }
    sthan.name=name;
    sthan.description=description;
    sthan.category=category;

    await sthan.save();
    return sthan;
  };

const listSthan = async (bookId="",sortKey = 'createdAt', sortOrder = 'DESC', limit = 10, page = 1,search="") => {
    let sortCriteria = {};
    let listFilter = {
        isDeleted:false
    }
    if(bookId){
        listFilter.bookId=bookId;
    }

    sortCriteria[sortKey] = sortOrder;

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const totalSthans = await Sthan.find(listFilter).countDocuments();

    const sthans = await Sthan.find(listFilter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortCriteria);

    const sthanList = {
        limit: limit,
        page: page,
        totalPages: Math.ceil(totalSthans / limit),
        totalResult: totalSthans,
        results: sthans,
    };

    return sthanList;
};

const listNoLimitSthan = async (bookId="",search="") => {

    let listFilter = {
        isDeleted:false
    }
    if(bookId){
        listFilter.bookId=bookId;
    }

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const sthans = await Sthan.find(listFilter);

    const sthanList = {
        results: sthans,
    };

    return sthanList;
};

const deleteSthanById = async (sthanId) => {
  const sthan = await getSthan(sthanId);
  sthan.isDeleted = true;
  await sthan.save();
  return sthan;
};

module.exports = {
    createSthan,
    updateSthan,
    getSthan,
    listSthan,
    deleteSthanById,
    listNoLimitSthan,
};
