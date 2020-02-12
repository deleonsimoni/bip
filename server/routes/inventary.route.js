const express = require('express');
const passport = require('passport');
const inventaryCtrl = require('../controllers/inventary.controller');

const router = express.Router();
module.exports = router;


router.get('/', passport.authenticate('jwt', { session: false }), getInventaryByUser);

router.post('/', passport.authenticate('jwt', { session: false }), insertInventary);

router.put('/', passport.authenticate('jwt', { session: false }), updateInventary);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteInventary);

async function getInventaryByUser(req, res) {
  let employee = await inventaryCtrl.getInventaryByUser(req.user._id);
  res.json(employee);
}

async function updateInventary(req, res) {
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

  let employee = await inventaryCtrl.insertInventary(req.body, req.user._id).catch(

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