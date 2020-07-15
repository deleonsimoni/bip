const express = require('express');
const passport = require('passport');
const requireTypeEmployee = require('../middleware/type-employee');
const requireTypeMaster  = require('../middleware/type-master');
const clientCtrl = require('../controllers/client.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();
module.exports = router;

/* GET */

router.get('/user/:userId', passport.authenticate('jwt', { session: false }), asyncHandler(getClientsByUser));
router.get('/typeClient', passport.authenticate('jwt', { session: false }), asyncHandler(getClientTypeEnterprise));
router.get('/enterprise/:idEnterprise', passport.authenticate('jwt', { session: false }), asyncHandler(getClientsByEnterprise));
//Observação caso o usuário tenha permissão colocar em todas as rotas. requireTypeEmployee
router.get('/:id', passport.authenticate('jwt', { session: false }), requireTypeEmployee, requireTypeMaster, asyncHandler(getClientByID));
//router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(getClientByID));
router.get('/branch/:id', passport.authenticate('jwt', { session: false }), asyncHandler(getClientBranchByID));

/* POSTS */
router.post('/', passport.authenticate('jwt', {
  session: false
}), asyncHandler(insertClient));
router.post('/branch', passport.authenticate('jwt', {
  session: false
}), asyncHandler(insertClientBranch));

router.put('/', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateClient));

/* DELETES */
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), asyncHandler(deleteClient));
router.delete('/branch/:id', passport.authenticate('jwt', {
  session: false
}), asyncHandler(deleteClientBranch));


/* METOOOOOOOOOOOOOOOOOOODOS */

//GETS
async function getClientsByUser(req, res) {
  let client = await clientCtrl.getClientsByUser(req.params.userId);
  res.json(client);
}


async function getClientTypeEnterprise(req, res) {
  let client = await clientCtrl.getClientTypeEnterprise(req.user._id);
  res.json(client);
}

async function getClientsByEnterprise(req, res) {
  let client = await clientCtrl.getClientsByEnterprise(req.user._id);
  res.json(client);
}

async function getClientByID(req, res) {
  console.log('inside method getClientByID class client.route. ');
  let client = await clientCtrl.getClientByID(req.user._id);
  res.json(client);
  console.log("getClientByID: ", client);
}

async function getClientBranchByID(req, res) {
  let client = await clientCtrl.getClientBranchByID(req.params.id);
  res.json(client);
}
//FIM GET

async function updateClient(req, res) {
  let client = await clientCtrl.updateClient(req.body).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  res.json(client);
}

//POST
async function insertClient(req, res) {
  console.log('inside the method');
  req.body.userId = req.user._id;
  console.log('Value ' + req.body.idcompany);
  req.body.enterprise = req.body.idcompany;
  let client = await clientCtrl.insertClient(req.body, req.user._id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  console.log('client ');
  res.json(client);
}

async function insertClientBranch(req, res) {
  let client = await clientCtrl.insertBranch(req.body);
  res.json(client);
}
//FIM POST

//DELETE
async function deleteClient(req, res) {
  let client = await clientCtrl.deleteClient(req.params.id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    });
  res.json(client);
}

async function deleteClientBranch(req, res) {
  let client = await clientCtrl.deleteClientBranch(req.params.id);
  res.json(client);
}
//FIM DELETE
