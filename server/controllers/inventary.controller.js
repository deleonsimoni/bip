const Inventary = require('../models/inventary.model');

module.exports = {
  getInventaryByUser,
  insertInventary,
  updateInventary,
  deleteInventary,
  getTotalInventary,
  getInventaryByInvetary,

}


async function getInventaryByInvetary(id) {
  console.log("The value in the class invetary.controller and method getInventaryByInvetary", id);
  return await Inventary.findOne({ _id: id });
}

async function getInventaryByUser(id) {
  console.log("The value in the class invetary.controller and method getInventaryByUser", id);
  return await Inventary.find({ userId: id });
}

async function insertInventary(inventary, userId) {
  console.log("The value in the class invetary.controller and method insertInventary", inventary);
  let inventaryForm = inventary.inventary
  inventaryForm.userId = userId;
  delete inventaryForm._id;
  return await new Inventary(inventaryForm).save();

}


async function updateInventary(inventary) {
  
  console.log("The value in the class invetary.controller and method updateInventary", inventary);
  let inventaryForm = inventary.inventary;
  console.log("inventary ==> ",inventary.inventarySelected);
  return await Inventary.findOneAndUpdate(
    { _id: inventary.inventarySelected },
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

