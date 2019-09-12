const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return !/^[0-9]/.test(v);
      },
      message: props => `${props.value} is not a valid user name. It should not start with number!`
    },
  },
  password: String,
  // lastModifiedDate: Date//set from express middleware just for tutorial purpose or better use below
  lastModifiedDate:  { type : Date, default: Date.now }
});

module.exports = mongoose.model('User', schema)
