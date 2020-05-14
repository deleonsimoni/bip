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
  insert
}

async function insert(user) {
  //user = await Joi.validate(user, userSchema, { abortEarly: false });
  console.log('Code of the user: ', user);
  let objUser = user.user
  console.log("This is the method Insert 1. ");
  objUser.hashedPassword = bcrypt.hashSync(objUser.password, 10);
  delete objUser._id;
  const address = await new Address(objUser.address).save();
  //objUser.idaddress = address._id;
  console.log("This is the method Insert 2. ", address);
  //objUser.master.insert('idaddress', address._id);
  objUser.master.phones = objUser.phones;
  console.log("This is the value on the my phone. ", objUser.phones.main);
  objUser.master.idaddress = address._id;
  objUser.master.cpf = objUser.cpf;
  const master = await new Master(objUser.master).save();
  //delete user.password;~
  console.log("This is the method Insert 3. ", master);
  return await new User(objUser).save();
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
