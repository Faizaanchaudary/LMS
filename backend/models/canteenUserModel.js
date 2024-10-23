const mongoose = require('mongoose');

const canteenUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  num: { type: String, required: true },
  password: { type: String, required: true },
});

const CanteenUser = mongoose.model('CanteenUser', canteenUserSchema);

module.exports = CanteenUser;
