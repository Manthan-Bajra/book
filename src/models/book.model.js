const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
      type: String,
      required: false,
    },
    imageName: {
      type: String,
      required: false,
    },
    imageExpiredAt: {
      type: Date,
      required: false,
    },
    category: {
        type: String,
        required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Book
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;