const httpStatus = require('http-status');
const Page = require('../models/page.model');
const ApiError = require('../utils/ApiError');
const SubContent = require('../models/subContent.model');

const getPage = async (pageId) => {
    const page = await Page.findOne({_id:pageId,isDeleted:false});
    if (!page) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
    }
    await page.save();
    return page;
  };

const createPage = async (userBody) => {
  const {title,bookId,sthanId,shlokId,chapterId,description,subContentIds} = userBody;
  let ids = [];
  const page = await Page.create({bookId,title,sthanId,chapterId,shlokId,description});
  if(subContentIds.length > 0){
    await Promise.all(
        subContentIds.map(async(subContentId,index)=>{
            if(subContentId._id){
                ids.push(subContentId._id);
            }else{
                let subcontent = await SubContent.create({title:subContentId.title,description:subContentId.description});
                ids.push(subcontent._id);
            }
        })
    );
    page.subContentIds = ids;
  }
  page.subContentIds = ids;
  await page.save();
  return page;
};

const updatePage = async (userBody) => {
    const {pageId,sthanId,title,description,chapterId,shlokId,bookId,subContentIds} = userBody;
    let page = await getPage(pageId);
    page.title=title;
    page.description=description;
    page.sthanId = sthanId;
    page.chapterId = chapterId;
    page.bookId = bookId;
    page.shlokId = shlokId;
    //sub content
    let ids = [];
    if(subContentIds.length > 0){
        await Promise.all(
            subContentIds.map(async(subContentId,index)=>{
                if(subContentId._id){
                    ids.push(subContentId._id);
                }else{
                    let subcontent = await SubContent.create({title:subContentId.title,description:subContentId.description});
                    ids.push(subcontent._id);
                }
            })
        );
    page.subContentIds = ids;
    }
    await page.save();
    return page;
  };

const listPage = async (bookId="",sthanId="",chapterId="",shlokId="",sortKey = 'createdAt', sortOrder = 'DESC', limit = 10, page = 1,search="") => {
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
    if(shlokId){
        listFilter.shlokId=shlokId;
    }
    sortCriteria[sortKey] = sortOrder;

    if(search){
        listFilter.title = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const totalPages = await Page.find(listFilter).countDocuments();

    const pages = await Page.find(listFilter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortCriteria);

    const pageList = {
        limit: limit,
        page: page,
        totalPages: Math.ceil(totalPages / limit),
        totalResult: totalPages,
        results: pages,
    };

    return pageList;
};

const listNoLimitSub = async (search="") => {

    let listFilter = {
        isDeleted:false
    }

    if(search){
        listFilter.title = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const subContents = await SubContent.find(listFilter);

    const subContentList = {
        results: subContents,
    };

    return subContentList;
};

const deletePageById = async (pageId) => {
  const page = await getPage(pageId);
  page.isDeleted = true;
  await page.save();
  return page;
};

module.exports = {
    createPage,
    updatePage,
    getPage,
    listPage,
    deletePageById,
    listNoLimitSub,
};
