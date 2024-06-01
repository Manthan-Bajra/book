const mongoose = require('mongoose');

const subContentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
 * @typedef SubContent
 */
const SubContent = mongoose.model('SubContent', subContentSchema);

module.exports = SubContent;