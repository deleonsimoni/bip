const express = require('express');
const passport = require('passport');
const collectorCtrl = require('../controllers/collector.controller');
const clientCtrl = require('../controllers/client.controller');
const employeeCtrl = require('../controllers/employee.controller');
const companyCtrl = require('../controllers/company.controller');
//const inventaryCtrl = require('../controllers/inventary.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.get('/totalCollectors/:idUser', getTotalCollectors);
router.get('/totalClients/:idUser', getTotalClients);
//router.get('/totalInventary/:idUser', getTotalInventary);
router.get('/totalEmployees/:idUser', getTotalEmployee);
router.get('/totalCompany/:idUser', getTotalCompany);

async function getTotalCollectors(req, res) {
  let response = await collectorCtrl.getTotalCollectors(req.params.idUser);
  res.json(response);
}

async function getTotalClients(req, res) {
  let response = await clientCtrl.getTotalClients(req.params.idUser);
  res.json(response);
}

/*async function getTotalInventary(req, res) {
  let collector = await inventaryCtrl.getTotalInventary(req.params.id);
  res.json(collector);
}*/

async function getTotalEmployee(req, res) {
  let response = await employeeCtrl.getTotalEmployee(req.params.idUser);
  res.json(response);
}

async function getTotalCompany(req, res) {
  let response = await companyCtrl.getTotalCompany(req.params.idUser);
  res.json(response);
}