const express = require('express');
const passport = require('passport');
const collectorCtrl = require('../controllers/collector.controller');

const router = express.Router();
module.exports = router;


router.get('/enterprise/:idEnterprise', getCollectorByEnterprise);
router.post('/', passport.authenticate('jwt', { session: false }), insertCollector);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCollector);

async function getCollectorByEnterprise(req, res) {
  let collector = await collectorCtrl.getCollectors(req.params.id);
  res.json(collector);
}

async function insertCollector(req, res) {
  let collector = await collectorCtrl.insertCollector(req.body, req.user.enterprise);
  res.json(collector);
}

async function deleteCollector(req, res) {
  let collector = await collectorCtrl.deleteCollector(req.params.id);
  res.json(collector);
}