const express = require('express');
const passport = require('passport');
const employeeCtrl = require('../controllers/employee.controller');

const router = express.Router();
module.exports = router;


router.get('/enterprise/:idEnterprise', passport.authenticate('jwt', { session: false }), getEmployeesByEnterprise);
router.get('/', passport.authenticate('jwt', { session: false }), getEmployeeByUserID);

router.post('/', passport.authenticate('jwt', { session: false }), insertEmployee);
router.post('/branch', passport.authenticate('jwt', { session: false }), insertEmployeeBranch);

router.put('/', passport.authenticate('jwt', { session: false }), updateEmployee);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteEmployee);
router.delete('/branch/:id', passport.authenticate('jwt', { session: false }), deleteEmployeeBranch);

//GETS
async function getEmployeesByEnterprise(req, res) {
  let employee = await employeeCtrl.getEmployeesByEnterprise(req.params.idEnterprise);
  res.json(employee);
}

async function getEmployeeByUserID(req, res) {
  let employee = await employeeCtrl.getEmployeeByUserID(req.user._id);
  res.json(employee);
}

async function getEmployeeBranchByID(req, res) {
  let employee = await employeeCtrl.getEmployeeBranchByID(req.params.id);
  let employee = await employeeCtrl.getEmployeeBranchByID(req.params.id);
  res.json(employee);
}
//FIM GET

async function updateEmployee(req, res) {
  let employee = await employeeCtrl.updateEmployee(req.body).catch(
    err => { res.json(400, {
      error: 1,
      msg: err
   })})
  res.json(employee);
}

//POST
async function insertEmployee(req, res) {
  let employee = await employeeCtrl.insertEmployee(req.body, req.user._id).catch(
    err => { res.json(400, {
      error: 1,
      msg: err
   })})
  res.json(employee);
}

async function insertEmployeeBranch(req, res) {
  let employee = await employeeCtrl.insertBranch(req.body);
  res.json(employee);
}
//FIM POST

//DELETE
async function deleteEmployee(req, res) {
  let employee = await employeeCtrl.deleteEmployee(req.params.id).catch(
    err => { res.json(400, {
      error: 1,
      msg: err
   })});
  res.json(employee);
}

async function deleteEmployeeBranch(req, res) {
  let employee = await employeeCtrl.deleteEmployeeBranch(req.params.id);
  res.json(employee);
}
//FIM DELETE