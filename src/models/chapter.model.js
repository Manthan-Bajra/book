const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        required: true,
    },
    sthanId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Sthan',
        required: false,
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
 * @typedef Chapter
 */
const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;