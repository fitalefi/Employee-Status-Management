const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: 'Working'
  }
});

module.exports = User = mongoose.model('user', UserScheme);
