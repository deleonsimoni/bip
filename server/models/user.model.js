const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  // Inicio Chaves
  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise'
  },
  collectors: [{
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory'
    },
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collector'
    }
  }],
//
  //Fim chaves
  fullname: {
    type: String,
    required: true
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
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  hashedPassword: {
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
  },
  roles: {
    type: Number
  },
  accessLog: [{
    date: { type: Date }
  }]
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
