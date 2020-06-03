const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({

  street: String,
 // complement: String,
 // number: String,
  zip: String,
  city: String,
  district: String,
  country: String,
  state: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
  });


module.exports = mongoose.model('Address', AddressSchema);