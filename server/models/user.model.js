const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  // Inicio Chaves
  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise'
  },
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

  //Fim chaves
  fullname: {
    type: String,
    required: true
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
  document: {
    type: String
    //required: true
  },
  birthday: {
    type: Date
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
