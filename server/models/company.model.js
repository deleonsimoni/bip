const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullnamecompany: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  cnpj: {
    type: String,
    required: true
  },
  phones: {
    main: { type: String },
    secundary: { type: String }
  },
  idaddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
    //required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
  });


module.exports = mongoose.model('Company', CompanySchema);