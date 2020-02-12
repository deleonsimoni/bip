const Address = require('../models/address.model');

module.exports = {
  getAddressByAddresID,
  insertAddress,
  updateAddress,
  deleteAddress,
}


async function getAddressByAddresID(id) {

  console.log('getAddressByAddresID controller ' + id)
  return await Address.find({ _id: id });
}

async function insertAddress(address, userId) {
  console.log('Codigo do Usuário 16: ', userId);
  console.log('Lista de Funcionário', employee.employee);
  //let functionary = employee.functionary;
  let functionary = employee.employee
  functionary.userId = userId;
  delete functionary._id;
  console.log('Codigo do Usuário 20: ', functionary)
  const address = await new Address(functionary.address).save();
  functionary.idaddress = address._id;
  return await new Employee(functionary).save();

}


async function updateAddress(address) {

  let functionary = employee.employee;
  console.log(employee.employee);
  return await Employee.findOneAndUpdate(
    { _id: functionary._id },
    {
      '$set':
        functionary
    }
  );
}

async function deleteAddress(id) {
  return await AddressindOneAndRemove({ _id: id });
}

