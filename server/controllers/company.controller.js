const Company = require('../models/company.model');
const Address = require('../models/address.model');

module.exports = {
  getCompanyByUserID,
  getAddressByAddresCEP,
  insertCompany,
  updateCompany,
  deleteCompany,
  getTotalCompany,

}

async function getCompanyByUserID(id) {
  //return await Company.find({ userId: id }).populate('idaddress');
  
  let lstCompany = await Company.find({ userId: id });
  //let lstCompany = await Company.find({fullnamecompany: {$regex: /[A]/}}).pretty();
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

async function getAddressByAddresCEP(idCEP) {
  let lstZIP = await Address.findOne({ zip: idCEP }).select('_id');
  console.log('Informatiom Id of the ZIP ', lstZIP);
  return lstZIP;
}

async function insertCompany(company, userId) {
  console.log('Lista de Empresa', company);
  let empresa = company.empresa;
  empresa.userId = userId;
  delete empresa._id;
  console.log('Information of the company ',empresa);
  let lstAddress = await this.getAddressByAddresCEP(empresa.address.zip);
  console.log('Id of the address ',lstAddress);  
  if (lstAddress != null){
     console.log('List address empty. ');
     empresa.idaddress = lstAddress._id;
  }
  else {
      console.log('List address exist. ');
      const address = await new Address(empresa.address).save();
      empresa.idaddress = address._id;
  }
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

