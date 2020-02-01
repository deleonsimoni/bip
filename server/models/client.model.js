const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  enterprise: {
    type: String,
    required: true
  },
  fullname: {
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
  cpf: {
    type: String,
    //required: true
  },
  phones: {
    main: { type: String },
    secundary: { type: String }
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

module.exports = mongoose.model('Client', ClientSchema);