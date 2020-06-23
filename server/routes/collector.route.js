const express = require('express');
const passport = require('passport');
const collectorCtrl = require('../controllers/collector.controller');

const router = express.Router();
module.exports = router;

/* GET */
router.get('/', getCollectorByEnterprise);
/* FIM GET*/

/* POST */
router.post('/', passport.authenticate('jwt', {
  session: false
}), insertCollector);
/* FIM POST */

/* DELETE */
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), deleteCollector);
/* FIM DELETE */

async function getCollectorByEnterprise(req, res) {
  let collector = await collectorCtrl.getCollectors(req.params.id);
  res.json(collector);
}

async function insertCollector(req, res) {
  let collector = await collectorCtrl.insertCollector(req.body, req.user._id);
  res.json(collector);
}

async function deleteCollector(req, res) {
  let collector = await collectorCtrl.deleteCollector(req.params.id);
  res.json(collector);
}