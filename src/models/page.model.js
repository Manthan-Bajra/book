const mongoose = require('mongoose');

const pageSchema = mongoose.Schema(
  {
    title: {
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
    chapterId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chapter',
        required: false,
    },
    shlokId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Shlok',
        required: false,
    },
    subContentIds: {
      type: Array,
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
 * @typedef Page
 */
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;