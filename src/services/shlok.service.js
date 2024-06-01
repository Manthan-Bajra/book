const httpStatus = require('http-status');
const Shlok = require('../models/shlok.model');
const ApiError = require('../utils/ApiError');

const getShlok = async (shlokId) => {
    const shlok = await Shlok.findOne({_id:shlokId,isDeleted:false});
    if (!shlok) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Shlok not found');
    }
    await shlok.save();
    return shlok;
  };

const createShlok = async (userBody) => {
  const {name,bookId,sthanId,chapterId,description} = userBody;
  return Shlok.create({bookId,name,sthanId,chapterId,description});
};

const updateShlok = async (userBody) => {
    const {shlokId,sthanId,name,description,chapterId,bookId} = userBody;
    let shlok = await getShlok(shlokId);
    shlok.name=name;
    shlok.description=description;
    shlok.sthanId = sthanId;
    shlok.chapterId = chapterId;
    shlok.bookId = bookId;

    await shlok.save();
    return shlok;
  };

const listShlok = async (bookId="",sthanId="",chapterId="",sortKey = 'createdAt', sortOrder = 'DESC', limit = 10, shlok = 1,search="") => {
    let sortCriteria = {};
    let listFilter = {
        isDeleted:false
    }
    if(bookId){
        listFilter.bookId=bookId;
    }
    if(sthanId){
        listFilter.sthanId=sthanId;
    }
    if(chapterId){
        listFilter.chapterId=chapterId;
    }
    sortCriteria[sortKey] = sortOrder;

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const totalShloks = await Shlok.find(listFilter).countDocuments();

    const shloks = await Shlok.find(listFilter)
    .limit(limit)
    .skip((shlok - 1) * limit)
    .sort(sortCriteria);

    const shlokList = {
        limit: limit,
        shlok: shlok,
        totalShloks: Math.ceil(totalShloks / limit),
        totalResult: totalShloks,
        results: shloks,
    };

    return shlokList;
};

const listNoLimitShlok = async (bookId="",sthanId="",chapterId="",search="") => {

    let listFilter = {
        isDeleted:false
    }
    if(bookId){
        listFilter.bookId=bookId;
    }
    if(sthanId){
        listFilter.sthanId=sthanId;
    }
    if(chapterId){
        listFilter.chapterId=chapterId;
    }

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const shloks = await Shlok.find(listFilter);

    const shlokList = {
        results: shloks,
    };

    return shlokList;
};

const deleteShlokById = async (shlokId) => {
  const shlok = await getShlok(shlokId);
  shlok.isDeleted = true;
  await shlok.save();
  return shlok;
};

module.exports = {
    createShlok,
    updateShlok,
    getShlok,
    listShlok,
    deleteShlokById,
    listNoLimitShlok,
};
