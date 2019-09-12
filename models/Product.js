const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

module.exports = mongoose.model('Product', schema)
