const Collector = require('../models/collector.model');

module.exports = {
  getCollectors,
  insertCollector,
  deleteCollector
}

async function getCollectors() {
  return await Collector.find()
    .sort({ createAt: -1 });
}

async function insertCollector(collector, idEnterprise) {
  collector.enterprise = idEnterprise;
  //collector.serial = generateSerial;
  return await new Collector(collector).save();
}

async function deleteCollector(id) {
  return await Collector.findOneAndRemove({ _id: id });
}