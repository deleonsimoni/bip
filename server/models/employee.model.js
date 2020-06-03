const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: {
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
  numberAddress: {
    type: String,
    required: true
  },
  complementAddress: {
    type: String,
  },
  idcompany: {
    type: String,
    //mongoose.Schema.Types.ObjectId,
    //ref: 'Company'
    //required: true
  },
  idclient: {
    type: String,
    //mongoose.Schema.Types.ObjectId,
    //ref: 'Client'
    //required: true
  },
  idaddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
    //required: true
  },
  phones: {
    main: { type: String },
    secundary: { type: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
  });

module.exports = mongoose.model('Employee', EmployeeSchema);