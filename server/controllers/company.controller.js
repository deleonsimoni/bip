const Company = require('../models/company.model');

module.exports = {
  getCompanyByUserID,
  insertCompany,
  updateCompany,
  deleteCompany,
  getTotalCompany,

}


async function getCompanyByUserID(id) {
  return await Company.find({ userId: id }).populate('idaddress');
}

async function insertCompany(company, userId) {
  console.log('Lista de Empresa', company);
  let empresa = company.empresa;
  empresa.userId = userId;
  delete empresa._id;
  console.log(empresa)
  return await new Company(empresa).save();
}


async function updateCompany(company) {

  let empresa = company.empresa;
  console.log(company.empresa);
  return await Company.findOneAndUpdate(
    { _id: empresa._id },
    {
      '$set':
        empresa
    }
  );
}

async function deleteCompany(id) {
  return await Company.findOneAndRemove({ _id: id });
}

async function getTotalCompany(idUser) {
  return await Company.find({ userId: idUser }).count();
}

