const express = require('express');
const passport = require('passport');
const clientCtrl = require('../controllers/client.controller');

const router = express.Router();
module.exports = router;


router.get('/enterprise/:idEnterprise', passport.authenticate('jwt', { session: false }), getClientsByEnterprise);
router.get('/:id', passport.authenticate('jwt', { session: false }), getClientByID);
router.get('/branch/:id', passport.authenticate('jwt', { session: false }), getClientBranchByID);

router.post('/', passport.authenticate('jwt', { session: false }), insertClient);
router.post('/branch', passport.authenticate('jwt', { session: false }), insertClientBranch);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteClient);
router.delete('/branch/:id', passport.authenticate('jwt', { session: false }), deleteClientBranch);

//GETS
async function getClientsByEnterprise(req, res) {
  let client = await clientCtrl.getClientsByEnterprise(req.params.id);
  res.json(client);
}

async function getClientByID(req, res) {
  let client = await clientCtrl.getClientByID(req.params.id);
  res.json(client);
}

async function getClientBranchByID(req, res) {
  let client = await clientCtrl.getClientBranchByID(req.params.id);
  res.json(client);
}
//FIM GET

//POST
async function insertClient(req, res) {
  let client = await clientCtrl.insertClient(req.body, req.user.enterprise);
  res.json(client);
}

async function insertClientBranch(req, res) {
  let client = await clientCtrl.insertBranch(req.body);
  res.json(client);
}
//FIM POST

//DELETE
async function deleteClient(req, res) {
  let client = await clientCtrl.deleteClient(req.params.id);
  res.json(client);
}

async function deleteClientBranch(req, res) {
  let client = await clientCtrl.deleteClientBranch(req.params.id);
  res.json(client);
}
//FIM DELETE