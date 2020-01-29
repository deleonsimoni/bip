const Employee = require('../models/employee.model');
const Address = require('../models/address.model');

module.exports = {
  getEmployeeByUserID,
  insertEmployee,
  updateEmployee,
  deleteEmployee,
}


async function getEmployeeByUserID(id) {
  return await Employee.find({userId: id});
}

async function insertEmployee(employee, userId) {
  console.log('Codigo do Usuário 16: ',userId);
  console.log('Lista de Funcionário',employee.employee);
  //let functionary = employee.functionary;
  let functionary = employee.employee
  functionary.userId = userId;
  delete functionary._id;
  console.log('Codigo do Usuário 20: ',functionary)
  const address = await new Address(functionary.address).save();
  functionary.idaddress = address._id;
  return await new Employee(functionary).save();

}


async function updateEmployee(employee) {
  
  let functionary = employee.employee;
  console.log(employee.employee);
  return await Employee.findOneAndUpdate(
    { _id: functionary._id},
    {'$set': 
    functionary
    }
  );
}

async function deleteEmployee(id) {
  return await EmployeeindOneAndRemove({ _id: id });
}

