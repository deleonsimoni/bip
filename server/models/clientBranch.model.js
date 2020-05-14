const mongoose = require('mongoose');

const ClientBranchSchema = new mongoose.Schema({

  enterprise: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullnamebranch: {
    type: String,
    required: true
  },
  typeName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  cnpj: {
    type: String,
    required: true
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
    type: String,
    //ref: 'Company'
  },
  idaddress: {
    type: String,
    //mongoose.Schema.Types.ObjectId,
    //ref: 'Address'
    //required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

}, {
    versionKey: false
  });


module.exports = mongoose.model('ClientBranch', ClientBranchSchema);
