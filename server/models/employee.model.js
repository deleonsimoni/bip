const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  cpf: {
    type: String,
    required: true
  },
  phones: {
    main: { type: String },
    secundary: { type: String }
  },
  fullnamecompany:{
    type: String,
    required: true
  },
  address: {
    street: String,
    complement: String,
    num: String,
    zip: String,
    city: String,
    district: String,
    country: String,
    state: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Employee', EmployeeSchema);