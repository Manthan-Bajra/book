const mongoose = require('mongoose');

const sthanSchema = mongoose.Schema(
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
 * @typedef Sthan
 */
const Sthan = mongoose.model('Sthan', sthanSchema);

module.exports = Sthan;