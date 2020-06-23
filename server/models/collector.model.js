const mongoose = require('mongoose');

const CollectorSchema = new mongoose.Schema({

  // Inicio Chaves
  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise'
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //Fim chaves

  serial: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Collector', CollectorSchema);