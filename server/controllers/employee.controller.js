const Employee = require('../models/employee.model');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Master = require('../models/master.model');
const bcrypt = require('bcrypt');

module.exports = {
  getEmployeeByUserID,
  getMasterEmployeeUserList,
  getAddressByAddresCEP,
  insertEmployee,
  updateEmployee,
  deleteEmployee,
  getTotalEmployee,
  getEmployeeFindUserEmail,
  getUserFindEmail,

}


async function getEmployeeByUserID(id) {
  console.log('This is the method  getEmployeeByUserID class employee.controller.', id);
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

async function getMasterEmployeeUserList(id) {
  console.log('This is the method  getEmployeeByUserID class employee.controller.', id);
  let lstEmployee = await Employee.find({ userId: id }).select(['userId','fullname','loginId']);
  let lista = JSON.parse(JSON.stringify(lstEmployee));
  return lista;
}

async function getEmployeeFindUserEmail(emailId) {
  console.log('This is the method  getEmployeeFindUserEmail class employee.controller.', emailId);
  let userFind = '';
  try {
    userFind = await Employee.findOne({ email: userEmail }).select('_id');
    console.log('Informatiom Id of the user ', userFind);
   
  } catch {
    console.log('Erro ao listar os empregados e seus endereços.');
  }
  return userFind;
}


async function getAddressByAddresCEP(idCEP) {
  
  try {
      console.log('Informatiom Id of the ZIP 1 ', idCEP);
      let cepId = await Address.findOne({ zip: idCEP }).select('_id');
      return cepId;
  } catch {
      console.log('Erro ao listar os empregados e seus endereços.');
  }
  return null;
}

async function getUserFindEmail(userEmail) {
  let userId = "";
  try {
  userId = await User.findOne({ email: userEmail }).select('_id');
  console.log('Informatiom Id of the user ', userId);
  } catch {
  console.log('Error to the select user.');
  }
  return userId;
}


async function insertEmployee(employee, userId) {
  
  console.log('Usuário logado: ', userId);
  console.log('Lista dos Dados do Funcionário: ', employee.employee);
  let objEmployee;
  let passwordPadrao = "User@3964&";
  let passwordbcrpt = bcrypt.hashSync(passwordPadrao, 10);
  let functionary = employee.employee
  functionary.userId = userId;
  
  //Verifica se o e-mail existe na coleção de usuário.
  let rerturnUserEmail = await this.getUserFindEmail(functionary.email);
  //Entrar na condição abaixo, caso não encontre o e-mail.
  if (rerturnUserEmail == null  || rerturnUserEmail =="" ) {
      let jsonString = JSON.parse(JSON.stringify({ isActivated: true, userTypeAccess: functionary.userTypeAccess, email: functionary.email, hashedPassword: passwordbcrpt}));
      console.log('functionary.userId 22: ', jsonString);
      delete functionary._id;
      user = await new User(jsonString).save();
      console.log('functionary.userId 4: ', user);
      functionary.loginId = user._id
      console.log('It return code user: ', functionary.loginId);
  }
  else {
      return objEmployee = null;
  }

  let returnEmployeeEmail = await this.getEmployeeFindUserEmail(functionary.email);
  console.log('Return user: ', returnEmployeeEmail);

  if (rerturnUserEmail == null || returnEmployeeEmail == null) {
      let lstAddress = await this.getAddressByAddresCEP(functionary.address.zip);
      console.log('List of the address: ', lstAddress)
      if (lstAddress != null){
        functionary.idaddress = lstAddress._id;
      }
      else {
        address = await new Address(functionary.address).save();
        functionary.idaddress = address._id;
      }
      console.log('Lista dos Dados do Endereço: ', address)
      console.log('Código do Endereço: ', functionary.idaddress);
   }

  console.log('functionary.userTypeAccess: ', functionary.userTypeAccess);
  if (functionary.userTypeAccess == 2){
     objEmployee = await new Master(functionary).save();
     console.log('Criação do Master : ', objEmployee);

   }
   else {
      console.log('returnEmployeeEmail: ', returnEmployeeEmail);
      if (returnEmployeeEmail == null || returnEmployeeEmail ==""){
          delete functionary._id;
          console.log('List of the data of employee: ', functionary)
          console.log('Lista dos Dados do Funcionário com ID do Endereço1 : ', functionary);
          //functionary.userTypeAccess = functionary.usertypeaccess;
          objEmployee = await new Employee(functionary).save();
          console.log('Criação do empregado : ', objEmployee);              
      }
      else {
          return objEmployee = null;
      }
    }     

   return objEmployee;

}


async function updateEmployee(employee) {

  let functionary = employee.employee;
  console.log('updateEmployee ' + employee.employee);
  //const address = 
  await Address.findOneAndUpdate({ _id: functionary.idaddress }, { '$set': functionary.address });
  return await Employee.findOneAndUpdate({ _id: functionary._id }, { '$set': functionary }

  );
}

async function deleteEmployee(id) {
  //let arr: number[] = [];
  //let arr: Array<number> = [];
  
  return await Employee.findOneAndRemove({ _id: id });
}


async function getTotalEmployee(idUser) {
  return await Employee.find({ userId: idUser }).count();
}

