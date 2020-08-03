//https://medium.com/trainingcenter/utilizando-travis-ci-para-fazer-continuous-deployment-de-suas-aplica%C3%A7%C3%B5es-no-github-pages-e86c6b55cba1
const express = require('express');
const passport = require('passport');
const employeeCtrl = require('../controllers/employee.controller');
const requireTypeEmployee = require('../middleware/type-employee');
const requireTypeMaster  = require('../middleware/type-master');

const router = express.Router();
module.exports = router;


router.get('/enterprise/:idEnterprise', passport.authenticate('jwt', { session: false }), getEmployeesByEnterprise);
router.get('/', passport.authenticate('jwt', { session: false }), requireTypeEmployee, requireTypeMaster, getEmployeeByUserID);

router.get('/masteremployee', passport.authenticate('jwt', { session: false }), getMasterEmployeeUserList);

router.post('/', passport.authenticate('jwt', { session: false }), insertEmployee);

router.put('/', passport.authenticate('jwt', { session: false }), updateEmployee);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteEmployee);

//GETS
async function getEmployeesByEnterprise(req, res) {
  console.log('inside method getEmployeesByEnterprise class employee.route. ');
  let employee = await employeeCtrl.getEmployeesByEnterprise(req.params.idEnterprise);
  res.json(employee);
}

async function getEmployeeByUserID(req, res) {
  console.log('inside method getEmployeeByUserID class employee.route. ');
  let employee = await employeeCtrl.getEmployeeByUserID(req.user._id);
  res.json(employee);
}


async function getMasterEmployeeUserList(req, res) {
  console.log('inside method getMasterEmployeeUserList class employee.route. ');
  let employee = await employeeCtrl.getMasterEmployeeUserList(req.user._id);
  res.json(employee);
}


//FIM GET

async function updateEmployee(req, res) {
  let employee = await employeeCtrl.updateEmployee(req.body).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  res.json(employee);
}

//POST
async function insertEmployee(req, res) {
  console.log('inside the method');
  let employee = await employeeCtrl.insertEmployee(req.body, req.user._id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  res.json(employee);
}

//FIM POST

//DELETE
async function deleteEmployee(req, res) {
  let employee = await employeeCtrl.deleteEmployee(req.params.id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    });
  res.json(employee);
}

//FIM DELETE