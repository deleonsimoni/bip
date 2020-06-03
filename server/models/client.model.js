const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  enterprise: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullnameclient: {
    type: String,
    required: true
  },
  typeName: {
    type: String,
    required: true
  },
  matrixEnterprise: {
    type: String,
  },
  Idclient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
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
  numberAddress: {
    type: String,
    required: true
  },
  complementAddress: {
    type: String,
  },
  phones: {
    main: { type: String },
    secundary: { type: String }
  },
  idcompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  idaddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    //required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
  });

module.exports = mongoose.model('Client', ClientSchema);