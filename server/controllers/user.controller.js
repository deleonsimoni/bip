const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Master = require('../models/master.model');
const Address = require('../models/address.model');
/*
const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})
*/

module.exports = {
  insert,
  getAddressByAddresCEP,
  getFindByEmail
}

async function getFindByEmail(idEmail) {
  console.log('Informatiom name of the e-mail in the method getFindByEmail ', idEmail);
  let objUser = await User.findOne({ email: idEmail });
  console.log('Informatiom name of the e-mail 1234 ', objUser);
  return objUser;
}

async function getAddressByAddresCEP(idCEP) {
  let lstZIP = await Address.findOne({ zip: idCEP }).select('_id');
  console.log('Informatiom Id of the ZIP ', lstZIP);
  return lstZIP;
}

async function insert(user) {
  //user = await Joi.validate(user, userSchema, { abortEarly: false });
  let objUser = user.user
  console.log("This is the method Insert 1. ");
  objUser.isActivated = true;
  objUser.userTypeAccess = 1;
  objUser.hashedPassword = bcrypt.hashSync(objUser.password, 10);
  delete objUser._id;
  console.log("This is the method Insert 2. ", objUser);
  let objReturnUser =  await new User(objUser).save();
  if (objReturnUser._id) {
      let lstAddress = await this.getAddressByAddresCEP(objUser.address.zip);
      //console.log('Id of the address ',lstAddress._id);  
      if (lstAddress != null){
        console.log('List address not empty. ');
        objUser.master.idaddress = lstAddress._id;
      }
      else {
          console.log('List address exist. ');
          address = await new Address(objUser.address).save();
          objUser.master.idaddress = address._id;
      }
      objUser.master.phones = objUser.phones;
      console.log("This is the value on the my phone. ", objUser.phones.main);
      objUser.master.cpf = objUser.cpf;
      objUser.master.userId = objReturnUser._id;
      objUser.master.complementAddress = objUser.complementAddress;
      objUser.master.numberAddress = objUser.numberAddress;
      const master = await new Master(objUser.master).save();
      }

      return await objReturnUser;
      //delete user.password;~
      //console.log("This is the method Insert 3. ", master);
      //return await new User(objUser).save();

}

/*$ db.mycol.insert({
    _id: ObjectId(7df78ad8902c),
    title: 'MongoDB Overview',
    description: 'MongoDB is no sql database',
    by: 'tutorials point',
    url: 'http://www.tutorialspoint.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
  })
  $ db.post.insert([
{
  title: 'MongoDB Overview',
  description: 'MongoDB is no sql database',
  by: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
},
{
  title: 'NoSQL Database',
  description: 'NoSQL database doesn't have tables',
  by: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 20,
  comments: [
  {
    user: 'user1',
    message: 'My first comment',
    dateCreated: new Date(2013,11,10,2,35),
    like: 0
  }]
}
])  */
