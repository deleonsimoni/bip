const Inventary = require('../models/inventary.model');

module.exports = {
  getInventaryByUser,
  insertInventary,
  updateInventary,
  deleteInventary,
  getTotalInventary,

}


async function getInventaryByUser(id) {
  return await Inventary.find({ userId: id });
}

async function insertInventary(inventary, userId) {

  let inventaryForm = inventary.inventary
  inventaryForm.userId = userId;
  delete inventaryForm._id;
  return await new Inventary(inventaryForm).save();

}


async function updateInventary(inventary) {

  let inventaryForm = inventary.inventary;
  return await Inventary.findOneAndUpdate(
    { _id: functionary._id },
    {
      '$set':
        inventaryForm
    }
  );
}

async function deleteInventary(id) {
  return await Inventary.findOneAndRemove({ _id: id });
}


async function getTotalInventary(idUser) {
  return await Inventary.find({ userId: idUser }).count();
}

