const mongoose = require('mongoose');

const headerSchema = mongoose.Schema(
  {
    name: {
      type: String,
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
    url: {
      type: String,
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
 * @typedef Header
 */
const Header = mongoose.model('Header', headerSchema);

module.exports = Header;