const mongoose = require('mongoose');

const shlokSchema = mongoose.Schema(
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
    chapterId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chapter',
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
 * @typedef Shlok
 */
const Shlok = mongoose.model('Shlok', shlokSchema);

module.exports = Shlok;