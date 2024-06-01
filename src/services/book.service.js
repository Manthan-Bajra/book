const httpStatus = require('http-status');
const Book = require('../models/book.model');
const ApiError = require('../utils/ApiError');
const AWSManager = require("../utils/aws");

const getBook = async (bookId) => {
    const book = await Book.findOne({_id:bookId,isDeleted:false});
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    await book.save();
    return book;
  };

const createBook = async (userBody) => {
  const {image,name,description,category} = userBody;
  const signedImage = await AWSManager.createUrl(image,AWSManager.bookFolderPath);
  return Book.create({image:signedImage,imageName:image,name,description,category});
};

const updateBook = async (userBody) => {
    const {bookId,image,name,description,category} = userBody;
    let book = await getBook(bookId);
    if(book.imageName != image){
        const signedImage = await AWSManager.createUrl(image,AWSManager.bookFolderPath);
        book.image = signedImage;
        book.imageName = image;
    }
    book.name=name;
    book.description=description;
    book.category=category;

    await book.save();
    return book;
  };

const listBook = async (sortKey = 'createdAt', sortOrder = 'DESC', limit = 10, page = 1,search="") => {
    let sortCriteria = {};
    let listFilter = {
        isDeleted:false
    }

    sortCriteria[sortKey] = sortOrder;

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const totalBooks = await Book.find(listFilter).countDocuments();

    const books = await Book.find(listFilter)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortCriteria);

    const bookList = {
        limit: limit,
        page: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalResult: totalBooks,
        results: books,
    };

    return bookList;
};

const listNoLimitBook = async (search="") => {

    let listFilter = {
        isDeleted:false
    }

    if(search){
        listFilter.name = {$regex: ".*" + search.toLowerCase() + ".*",'$options' : 'i'};
    }

    const books = await Book.find(listFilter);

    const bookList = {
        results: books,
    };

    return bookList;
};

const deleteBookById = async (bookId) => {
  const book = await getBook(bookId);
  book.isDeleted = true;
  await book.save();
  //delete sthan , page , chapter also 
  return book;
};

module.exports = {
    createBook,
    updateBook,
    getBook,
    listBook,
    deleteBookById,
    listNoLimitBook,
};
