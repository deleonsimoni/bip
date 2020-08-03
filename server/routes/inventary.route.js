const express = require('express');
const passport = require('passport');
const inventaryCtrl = require('../controllers/inventary.controller');

const router = express.Router();
module.exports = router;


router.get('/', passport.authenticate('jwt', { session: false }), getInventaryByUser);
router.get('/inventary/:idInventary', passport.authenticate('jwt', { session: false }), getInventaryByInvetary);
router.post('/', passport.authenticate('jwt', { session: false }), insertInventary);

router.put('/', passport.authenticate('jwt', { session: false }), updateInventary);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteInventary);


async function getInventaryByInvetary(req, res) {
  console.log("The value in the class invetary.route and method getInventaryByInvetary", req.params.idInventary);
  let employee = await inventaryCtrl.getInventaryByInvetary(req.params.idInventary);
  res.json(employee);
}

async function getInventaryByUser(req, res) {
  console.log("The value in the class invetary.route and method getInventaryByUser");
  let employee = await inventaryCtrl.getInventaryByUser(req.user._id);
  res.json(employee);
}

async function updateInventary(req, res) {
  //console.log("The value in the class invetary.route and method updateInventary",req);
  let employee = await inventaryCtrl.updateInventary(req.body).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  res.json(employee);
}

//POST
async function insertInventary(req, res) {
    console.log("The value in the class invetary.route and method insertInventary");
    let inventary = await inventaryCtrl.insertInventary(req.body, req.user._id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    })
  res.json(inventary);
}

//FIM POST

//DELETE
async function deleteInventary(req, res) {
  let employee = await inventaryCtrl.deleteInventary(req.params.id).catch(
    err => {
      res.json(400, {
        error: 1,
        msg: err
      })
    });
  res.json(employee);
}
//FIM DELETE