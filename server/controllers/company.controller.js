const Company = require('../models/company.model');
const Address = require('../models/address.model');

module.exports = {
  getCompanyByUserID,
  insertCompany,
  updateCompany,
  deleteCompany,
  getTotalCompany,

}


async function getCompanyByUserID(id) {
  //return await Company.find({ userId: id }).populate('idaddress');
  let lstCompany = await Company.find({ userId: id });
  let list = JSON.parse(JSON.stringify(lstCompany));
  try {
    for (const element of list) {
      element.address = await Address.findOne({ _id: element.idaddress });
    }
  } catch {
    console.log('Erro ao listar asoempresas e seus endereços.');
  }
  return list;

}

async function insertCompany(company, userId) {
  console.log('Lista de Empresa', company);
  let empresa = company.empresa;
  empresa.userId = userId;
  delete empresa._id;
  console.log(empresa);
  const address = await new Address(empresa.address).save();
  empresa.idaddress = address._id;
  return await new Company(empresa).save();
}

async function updateCompany(company) {

  let empresa = company.empresa;
  console.log(company.empresa);
  await Address.findOneAndUpdate({ _id: empresa.idaddress }, { '$set': empresa.address });
  return await Company.findOneAndUpdate({ _id: empresa._id }, { '$set': empresa }
  );
}

async function deleteCompany(id) {
  return await Company.findOneAndRemove({ _id: id });
}

async function getTotalCompany(idUser) {
  return await Company.find({ userId: idUser }).count();
}

