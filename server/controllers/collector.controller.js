const Collector = require('../models/collector.model');

module.exports = {
  getCollectors,
  insertCollector,
  deleteCollector,
  getTotalCollectors
}

async function getCollectors() {
  return await Collector.find()
    .sort({
      createAt: -1
    });
}

async function getTotalCollectors(idUser) {
  return await Collector.find({
    userId: idUser
  }).count();
}

async function insertCollector(collector, userID) {
  collector.userId = userID;
  collector.serial = (new Date().getTime() + userID).toString(36);

  return await new Collector(collector).save();
}

async function deleteCollector(id) {
  return await Collector.findOneAndRemove({
    _id: id
  });
}
