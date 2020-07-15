const MasterEnployee = require('../models/masteremployee.model');
const httpError = require('http-errors');

const requireTypeMaster = async function (req, res, next) {

 
  if (req.user.userTypeAccess == 2)  {
    const masterId = await MasterEnployee.findOne({loginId:req.user._id}).select('masterEmployeeId -_id');
    req.user._id = masterId.masterEmployeeId;
    return next();
  }
  else {
    return next();
  }
}

module.exports = requireTypeMaster;
