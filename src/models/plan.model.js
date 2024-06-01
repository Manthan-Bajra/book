const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: false,
    },
    planId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
    },
    tenure: {
        type: String,
        required: false,
    },
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
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
    isActive: {
        type: Boolean,
        required: true,
        default: true,
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
 * @typedef Plan
 */
const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;