const MasterEnployee = require('../models/masteremployee.model');
const httpError = require('http-errors');

const requireTypeEmployee = async function (req, res, next) {

 
  if (req.user.userTypeAccess == 3 || req.user.userTypeAccess == 4)  {
    const masterId = await MasterEnployee.findOne({loginId:req.user._id}).select('masterEmployeeId -_id');
    req.user._id = masterId.masterEmployeeId;
    return next();
  }
  else {
    console.log('requireTypeEmployee');
    return next();
  }
}

module.exports = requireTypeEmployee;
