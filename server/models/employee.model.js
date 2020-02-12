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
  phones: {
    main: { type: String },
    secundary: { type: String }
  },
  idcompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
    //required: true
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

module.exports = mongoose.model('Employee', EmployeeSchema);