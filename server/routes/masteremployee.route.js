const express = require('express');
const passport = require('passport');
const masterEmployeeCtrl = require('../controllers/masteremployee.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();
module.exports = router;

/* GET */
//router.get('/user/:userId', passport.authenticate('jwt', { session: false }), asyncHandler(getClientsByUser));
//router.get('/typeClient', passport.authenticate('jwt', { session: false }), asyncHandler(getClientTypeEnterprise));
//router.get('/enterprise/:idEnterprise', passport.authenticate('jwt', { session: false }), asyncHandler(getClientsByEnterprise));
//router.get('/branch/:id', passport.authenticate('jwt', { session: false }), asyncHandler(getClientBranchByID));

////router.get('/email/:idEmail',[passport.authenticate('jwt', { session: false }), requireTypeEmployee], asyncHandler(getFindByEmail));
router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(getMasterEmployeeById));

/* POSTS */
//router.post('/branch', passport.authenticate('jwt', { session: false }), asyncHandler(insertClientBranch));
router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(insertMasterEmployee));
/* put */
router.put('/', passport.authenticate('jwt', { session: false }), asyncHandler(updateupdateMasterEmployee));

/* DELETES */
router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(deleteMasterEmployee));
//router.delete('/branch/:id', passport.authenticate('jwt', { session: false }), asyncHandler(deleteClientBranch));


/* METOOOOOOOOOOOOOOOOOOODOS */

//GETS
async function getMasterEmployeeById(req, res) {
  console.log('req.user._id ',req.user._id);
  let masterEmployee = await masterEmployeeCtrl.getMasterEmployeeById(req.user._id);
  console.log('masterEmployee ==>',masterEmployee);
  res.json(masterEmployee);
}


/*async function getClientTypeEnterprise(req, res) {
  let client = await clientCtrl.getClientTypeEnterprise(req.user._id);
  res.json(client);
}

async function getClientsByEnterprise(req, res) {
  let client = await clientCtrl.getClientsByEnterprise(req.user._id);
  res.json(client);
}

async function getClientByID(req, res) {
  console.log('inside method getClientByID class client.route. ');
  let client = await clientCtrl.getClientByID(req.params.id);
  res.json(client);
  console.log("getClientByID: ", client);
}

async function getClientBranchByID(req, res) {
  let client = await clientCtrl.getClientBranchByID(req.params.id);
  res.json(client);
} */
//FIM GET

async function updateupdateMasterEmployee(req, res) {
  let masterEmployee = await masterEmployeeCtrl.updateupdateMasterEmployee(req.body).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  res.json(masterEmployee);
}

//POST
async function insertMasterEmployee(req, res) {
  console.log('inside the method insertMasterEmployee. ');

  req.body.userId = req.user._id;
  console.log('inside the method insertMasterEmployee. ',req.body.userId );
  
  //req.body.enterprise = req.body.idcompany;
  let masterEmployee = await masterEmployeeCtrl.insertMasterEmployee(req.body, req.user._id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  console.log('insertMasterEmployee return ', masterEmployee);
  res.json(masterEmployee);
}

/*async function insertClientBranch(req, res) {
  let client = await clientCtrl.insertBranch(req.body);
  res.json(client);
}*/
//FIM POST

//DELETE
async function deleteMasterEmployee(req, res) {
  let masterEmployee = await masterEmployeeCtrl.deleteMasterEmployee(req.params.id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    });
  res.json(masterEmployee);
}

/*async function deleteClientBranch(req, res) {
  let client = await clientCtrl.deleteClientBranch(req.params.id);
  res.json(client);
}*/
//FIM DELETE
