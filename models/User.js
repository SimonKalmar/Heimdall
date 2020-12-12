const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  rewied: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;
