const Employee = require('../models/employee.model');
const Address = require('../models/address.model');

module.exports = {
  getEmployeeByUserID,
  insertEmployee,
  updateEmployee,
  deleteEmployee,
  getTotalEmployee,

}


async function getEmployeeByUserID(id) {
  console.log('This is the method  getEmployeeByUserID', id);
  let lstEmployee = await Employee.find({ userId: id });
  let lista = JSON.parse(JSON.stringify(lstEmployee));
  try {
    for (const element of lista) {
      element.address = await Address.findOne({ _id: element.idaddress });
    }
  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return lista;
}

async function insertEmployee(employee, userId) {
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


async function updateEmployee(employee) {

  let functionary = employee.employee;
  console.log('updateEmployee ' + employee.employee);
  //const address = 
  await Address.findOneAndUpdate({ _id: functionary.idaddress }, { '$set': functionary.address });
  return await Employee.findOneAndUpdate(
    { _id: functionary._id }, { '$set': functionary }

  );
}

async function deleteEmployee(id) {
  return await Employee.findOneAndRemove({ _id: id });
}


async function getTotalEmployee(idUser) {
  return await Employee.find({ userId: idUser }).count();
}

