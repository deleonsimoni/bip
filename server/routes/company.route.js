const express = require('express');
const passport = require('passport');
const companyCtrl = require('../controllers/company.controller');

const router = express.Router();
module.exports = router;


router.get('/enterprise/:idEnterprise', passport.authenticate('jwt', { session: false }), getCompanysByEnterprise);
router.get('/', passport.authenticate('jwt', { session: false }), getCompanyByUserID);
//router.get('/branch/:id', passport.authenticate('jwt', { sessio                                                                         n: false }), getClientBranchByID);

router.post('/', passport.authenticate('jwt', { session: false }), insertCompany);
router.post('/branch', passport.authenticate('jwt', { session: false }), insertCompanyBranch);

router.put('/', passport.authenticate('jwt', { session: false }), updateCompany);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCompany);
router.delete('/branch/:id', passport.authenticate('jwt', { session: false }), deleteCompanyBranch);

//GETS
async function getCompanysByEnterprise(req, res) {
  let company = await companyCtrl.getCompanysByEnterprise(req.params.idEnterprise);
  console.log("getCompanysByEnterprise: ",company.body);
  res.json(company);
}

async function getCompanyByUserID(req, res) {
  let company = await companyCtrl.getCompanyByUserID(req.user._id);
  res.json(company);
  console.log("getCompanyByUserID: ",company);
}

async function getCompanyBranchByID(req, res) {
  let company = await companyCtrl.getCompanyBranchByID(req.params.id);
  res.json(company);
}
//FIM GET

async function updateCompany(req, res) {
  let company = await companyCtrl.updateCompany(req.body).catch(
    err => { res.json(400, {
      error: 1,
      msg: err
   })})
  res.json(company);
}

//POST
async function insertCompany(req, res) {
  let company = await companyCtrl.insertCompany(req.body, req.user._id).catch(
    err => { res.json(400, {
      error: 1,
      msg: err
   })})
  res.json(company);
}

async function insertCompanyBranch(req, res) {
  let company = await companyCtrl.insertBranch(req.body);
  res.json(company);
}
//FIM POST

//DELETE
async function deleteCompany(req, res) {
  let company = await companyCtrl.deleteCompany(req.params.id).catch(
    err => { res.json(400, {
      error: 1,
      msg: err
   })});
  res.json(company);
}

async function deleteCompanyBranch(req, res) {
  let company = await companyCtrl.deleteCompanyBranch(req.params.id);
  res.json(company);
}
//FIM DELETE