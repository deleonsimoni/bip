const Client = require('../models/client.model');
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
  getTotalClients
}

async function getClientsByUser(id) {
  console.log('This is the method getClientsByUser ' + id);
  let lstClient = await Client.find({ userId: id });
  console.log('This is the object lstClient ' + lstClient);
  let lista = JSON.parse(JSON.stringify(lstClient));
  try {
    console.log('It list all clients.');

  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return lista;
}

async function getClientsByEnterprise(id) {
  console.log('This is the method getClientsByEnterprise ');
  let lstClient = await Client.find({ enterprise: id });
  console.log('This is the object lstClient ' + lstClient);
  let lista = JSON.parse(JSON.stringify(lstClient));
  try {
    for (const element of lista) {
      console.log('element.idaddress ' + element.idaddress);
      element.address = await Address.findOne({ _id: element.idaddress });
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
  return await Client.find({ enterprise: idUser }).count();
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
      element.address = await Address.findOne({ _id: element.idaddress });
    }
  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return lista;
}

async function getClientBranchByID(id) {
  return await clientBranch.findById(id);
}

async function insertClient(client) {
  console.log('It list of costumer.', client);
  let costumer = client.cliente;
  delete costumer._id;
  costumer.enterprise = client.enterprise;
  costumer.userId = client.userId;
  console.log('Create of address int the costumer. ' + costumer.address);
  const address = await new Address(costumer.address).save();
  costumer.idaddress = address._id;
  console.log('It save the cosntumer. ' + costumer.idaddress);
  return await new Client(costumer).save();
}

async function insertBranch(branch) {
  return await new clientBranch(client).save();
}

async function updateClient(client) {
  let costumer = client.cliente;
  await Address.findOneAndUpdate({ _id: costumer.idaddress }, { '$set': costumer.address });
  return await Client.findOneAndUpdate({ _id: costumer._id }, { '$set': costumer });
}

async function deleteClient(id) {
  return await Client.findOneAndRemove({ _id: id });
}

async function deleteClientBranch(id) {
  return await clientBranch.findOneAndRemove({ _id: id });
}