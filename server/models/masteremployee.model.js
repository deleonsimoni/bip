const mongoose = require('mongoose');

const MasterEnployeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
  loginId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
  fullname: {
    type: String,
    required: true
  },
  masterEmployeeId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('MasterEnployee', MasterEnployeeSchema);