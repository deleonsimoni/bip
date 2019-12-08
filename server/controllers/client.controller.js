const Client = require('../models/client.model');
const clientBranch = require('../models/clientBranch.model');

module.exports = {
  getClientsByEnterprise,
  getClientByID,
  getClientBranchByID,
  insertClient,
  insertBranch,
  deleteClient,
  deleteClientBranch
}

async function getClientsByEnterprise(id) {
  return await Client.find({ enterprise: id })
    .sort({ createAt: -1 });
}

async function getClientByID(id) {
  return await Client.findById(id);
}

async function getClientBranchByID(id) {
  return await clientBranch.findById(id);
}

async function insertClient(client) {
  let cliente = client.cliente;
  cliente.enterprise = client.enterprise;
  return await new Client(cliente).save();
}

async function insertBranch(branch) {
  return await new clientBranch(client).save();
}


async function deleteClient(id) {
  return await Client.findOneAndRemove({ _id: id });
}

async function deleteClientBranch(id) {
  return await clientBranch.findOneAndRemove({ _id: id });
}