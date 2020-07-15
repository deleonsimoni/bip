const MasterEmployee = require('../models/masteremployee.model');
//const Company = require('../models/company.model');
//const Address = require('../models/address.model');
//const clientBranch = require('../models/clientBranch.model');

module.exports = {
  getMasterEmployeeById,
  insertMasterEmployee,
  updateMasterEmployee,
  deleteMasterEmployee
  //getClientsByUser,
  //getClientsByEnterprise,
  //getAddressByAddresCEP,
  //getClientBranchByID,
  //insertBranch,
  //deleteClientBranch,
  //getTotalClients,
  //getClientTypeEnterprise
}

/*
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
}

async function getTotalClients(idUser) {
  console.log('This is the method getTotalClients ', idUser);
  return await Client.find({userId: idUser}).count();
}*/

/*async function getClientBranchByID(id) {
  return await clientBranch.findById(id);
}

async function getAddressByAddresCEP(idCEP) {
  let lstZIP = await Address.findOne({ zip: idCEP }).select('_id');
  console.log('Informatiom Id of the ZIP ', lstZIP);
  return lstZIP;
}

async function insertBranch(branch) {
  return await new clientBranch(client).save();
}

async function getMasterEmployeeByID(id) {
  console.log('This is the method getClientByID ' + id);
  let lstClient = await Client.find({ userId: id });
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
}*/

async function getMasterEmployeeById(id) {
  console.log('This is the method getMasterEmployeeById ' + id);
  let lstMasterEmployee;
  let lista;
  try {
    lstMasterEmployee = await MasterEmployee.find({masterEmployeeId: id});
    lista = JSON.parse(JSON.stringify(lstMasterEmployee));
    console.log('It list all MasterEmployee.', lista);
  } catch (Error){
    console.log('Erro ao listar os empregados e seus endereços.', Error);
  }
  return lista;
}

async function insertMasterEmployee(masterEmployee, userId) {
  console.log('insertMasterEmployee.');
  let costumer = masterEmployee;
  let lista = JSON.parse(JSON.stringify(costumer.targetCars));
  //let listaarray =  JSON.parse(JSON.stringify("[{userId:'5ef8f96b646d5e3dccdd995f', fullname:'Roberto Machado', masterEmployeeId:'5ef299d2058d1b43881bbcab'}]"));
  console.log('Dados do array ',lista);
  try {
    for (let element of lista) {
      //console.log('List of master and employee ' + element._id);
      element.masteremployee = await MasterEmployee.findOne({ loginId: element.loginId });
      if (element.masteremployee == null) {
          element.masterEmployeeId = element.userId;
          element.userId = element._id;
          delete element._id;
          console.log('element ', element);
          lista = await new MasterEmployee(element).save();
      }
    }
  } catch (Error) {
       console.log('Error: ', Error);
  }
  return lista;
}

async function updateMasterEmployee(masteremployee) {
  let costumer = masteremployee.MasterEmployee
  await Address.findOneAndUpdate({
    _id: costumer.idaddress
  }, {
    '$set': costumer.address
  });
  return await MasterEmployee.findOneAndUpdate({
    _id: costumer._id
  }, {
    '$set': costumer
  });

}

async function deleteMasterEmployee(masterEmployeeId) {
  console.log('Exclusão do master and employee ', masterEmployeeId);
  return await MasterEmployee.findOneAndRemove({ _id: masterEmployeeId });
}

