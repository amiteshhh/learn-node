const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  reviewComment: {
    type: String,
    required: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = mongoose.model('ProductReview', schema)
