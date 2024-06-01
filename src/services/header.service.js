const httpStatus = require('http-status');
const Header = require('../models/header.model');
const ApiError = require('../utils/ApiError');
const AWSManager = require("../utils/aws");

const createHeader = async (userBody) => {
  const {image,name,url} = userBody;
  const signedImage = await AWSManager.createUrl(image,AWSManager.headerFolderPath);
  return Header.create({image:signedImage,name,url});
};

const listHeader = async () => {
  const headers = await Header.find({isDeleted:false}); 
  return headers;
};

const deleteHeaderById = async (headerId) => {
  const header = await Header.findById(headerId);
  if (!header) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Header not found');
  }
  await header.remove();
  return header;
};

module.exports = {
  createHeader,
  listHeader,
  deleteHeaderById,
};
