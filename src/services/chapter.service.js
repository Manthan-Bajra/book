const httpStatus = require('http-status');
const Chapter = require('../models/chapter.model');
const ApiError = require('../utils/ApiError');

const getChapter = async (chapterId) => {
    const chapter = await Chapter.findOne({_id:chapterId,isDeleted:false});
    if (!chapter) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Chapter not found');
    }
    await chapter.save();
    return chapter;
  };

const createChapter = async (userBody) => {
  const {name,bookId,sthanId,description} = userBody;
  return Chapter.create({bookId,name,sthanId,description});
};

const updateChapter = async (userBody) => {
    const {chapterId,sthanId,name,description,bookId} = userBody;
    let chapter = await getChapter(chapterId);
    chapter.name=name;
    chapter.description=description;
    chapter.sthanId = sthanId
    chapter.bookId = bookId

    await chapter.save();
    return chapter;
  };

const listChapter = async (bookId="",sthanId="",sortKey = 'createdAt', sortOrder = 'DESC', limit = 10, page = 1,search="") => {
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

    sortCriteria[sortKey] = sortOrder;

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const totalChapters = await Chapter.find(listFilter).countDocuments();

    const chapters = await Chapter.find(listFilter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortCriteria);

    const chapterList = {
        limit: limit,
        page: page,
        totalPages: Math.ceil(totalChapters / limit),
        totalResult: totalChapters,
        results: chapters,
    };

    return chapterList;
};

const listNoLimitChapter = async (bookId="",sthanId="",search="") => {

    let listFilter = {
        isDeleted:false
    }
    if(bookId){
        listFilter.bookId=bookId;
    }
    if(sthanId){
        listFilter.sthanId=sthanId;
    }

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const chapters = await Chapter.find(listFilter);

    const chapterList = {
        results: chapters,
    };

    return chapterList;
};

const deleteChapterById = async (chapterId) => {
  const chapter = await getChapter(chapterId);
  chapter.isDeleted = true;
  await chapter.save();
  return chapter;
};

module.exports = {
    createChapter,
    updateChapter,
    getChapter,
    listChapter,
    deleteChapterById,
    listNoLimitChapter,
};
