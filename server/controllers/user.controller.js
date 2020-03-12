const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
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
  objUser.idaddress = address._id;
  console.log("This is the method Insert 2. ");
  //delete user.password;
  console.log("This is the method Insert 3. ");
  return await new User(objUser).save();
}
