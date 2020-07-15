const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/').post(asyncHandler(insert));
//router.get('/email/:idEmail',[passport.authenticate('jwt', { session: false }), requireTypeEmployee], asyncHandler(getFindByEmail));
router.get('/email/:idEmail',passport.authenticate('jwt', { session: false }), asyncHandler(getFindByEmail));


//router.post('/', passport.authenticate('jwt', { session: false }), insertEmployee);

async function getFindByEmail(req, res) {
  console.log("This is method getFindByEmail in the user.route ");
  let user = await userCtrl.getFindByEmail(req.params.userId);
  res.json(user);
}

async function insert(req, res) {
  console.log("This is method insert in the user.route ");
   let user = await userCtrl.insert(req.body, req.user._id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
   res.json(user);
}
