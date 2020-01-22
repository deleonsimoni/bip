const Company = require('../models/employee.model');

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
  let functionary = employee.functionary;
  functionary.userId = userId;
  delete functionary._id;
  console.log(functionary)
  return await new Employee(functionary).save();
}


async function updateEmployee(employee) {
  
  let functionary = employee.functionary;
  console.log(employee.functionary);
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

