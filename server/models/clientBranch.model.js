const mongoose = require('mongoose');

const ClientBranchSchema = new mongoose.Schema({

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },

  fullname: {
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
  },

}, {
  versionKey: false
});


module.exports = mongoose.model('ClientBranch', ClientBranchSchema);
