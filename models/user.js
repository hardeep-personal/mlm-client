// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  referredBy: String,
});

module.exports = mongoose.model('User', userSchema);
