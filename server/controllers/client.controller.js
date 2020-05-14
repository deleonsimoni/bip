const Client = require('../models/client.model');
const Company = require('../models/company.model');
const Address = require('../models/address.model');
const clientBranch = require('../models/clientBranch.model');

module.exports = {
  getClientsByUser,
  getClientsByEnterprise,
  getClientByID,
  getClientBranchByID,
  insertClient,
  insertBranch,
  updateClient,
  deleteClient,
  deleteClientBranch,
  getTotalClients,
  getClientTypeEnterprise
}

async function getClientsByUser(id) {
  console.log('This is the method getClientsByUser ' + id);
  let lstClient = await Client.find({
    userId: id
  });
  console.log('This is the object lstClient ' + lstClient);
  let lista = JSON.parse(JSON.stringify(lstClient));
  try {
    console.log('It list all clients.');

  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return lista;
}

async function getClientTypeEnterprise(id) {

  return await Client.find({ userId: id, typeName: 'Matriz' });

}
async function getClientsByEnterprise(id) {

  let company = await Company.find({
    userId: id
  });

  console.log('This is the method getClientsByEnterprise ');
  let lstClient = await Client.find({
    enterprise: id
  });
  console.log('This is the object lstClient ' + lstClient);
  let lista = JSON.parse(JSON.stringify(lstClient));
  try {
    for (const element of lista) {
      console.log('element.idaddress ' + element.idaddress);
      element.address = await Address.findOne({
        _id: element.idaddress
      });
    }
  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return lista;
  //return await Client.find({ enterprise: id })
  // .sort({ createAt: -1 });
}

async function getTotalClients(idUser) {
  console.log('This is the method getTotalClients ');
  return await Client.find({
    enterprise: idUser
  }).count();
}

async function getClientByID(id) {
  // return await Client.findById(id);
  console.log('This is the method getClientByID ');
  let lstClient = await Client.find(id);
  console.log('This is the object lstClient ' + lstClient);
  let lista = JSON.parse(JSON.stringify(lstClient));
  try {
    for (const element of lista) {
      console.log('element.idaddress ' + element.idaddress);
      element.address = await Address.findOne({
        _id: element.idaddress
      });
    }
  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return lista;
}

async function getClientBranchByID(id) {
  return await clientBranch.findById(id);
}

async function insertClient(client, userId) {
  let costumer = client.cliente;

  delete costumer._id;
  costumer.enterprise = costumer.idcompany;
  costumer.userId = userId;
  const address = await new Address(costumer.address).save();
  costumer.idaddress = address._id;
  return await new Client(costumer).save();

}

async function insertBranch(branch) {
  return await new clientBranch(client).save();
}

async function updateClient(client) {
  let costumer = client.cliente;
  await Address.findOneAndUpdate({
    _id: costumer.idaddress
  }, {
      '$set': costumer.address
    });
  return await Client.findOneAndUpdate({
    _id: costumer._id
  }, {
      '$set': costumer
    });

}

async function deleteClient(id) {
  return await Client.findOneAndRemove({
    _id: id
  });
}

async function deleteClientBranch(id) {
  return await clientBranch.findOneAndRemove({
    _id: id
  });
}
