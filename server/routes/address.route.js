const express = require("express");
const passport = require("passport");
const addressCtrl = require("../controllers/address.controller");

const router = express.Router();
module.exports = router;



router.get("/address/:idCEP", passport.authenticate("jwt", { session: false }), getAddressByAddresCEP);
router.get("/address/:idAddress", passport.authenticate("jwt", { session: false }), getAddressByAddresID);
router.get("/", passport.authenticate("jwt", { session: false }), getAddressByUserID);

router.post("/", passport.authenticate("jwt", { session: false }), insertAddress);
router.post("/branch", passport.authenticate("jwt", { session: false }), insertAddressBranch);

router.put("/", passport.authenticate("jwt", { session: false }), updateAddress);

router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteAddress);
router.delete("/branch/:id", passport.authenticate("jwt", { session: false }), deleteAddressBranch);

//GETS
async function getAddressByAddresID(req, res) {
  console.log("getAddressByAddresID " + req.params.idAddress);
  let address = await addressCtrl.getAddressByAddresID(req.params.idAddress);
  console.log("address " + address);
  res.json(address);
}

async function getAddressByAddresCEP(req, res) {
  let address = await addressCtrl.getAddressByAddresCEP(req.user._id);
  res.json(address);
}

async function getAddressByUserID(req, res) {
  let address = await addressCtrl.getAddressByUserID(req.user._id);
  res.json(address);
}

//FIM GET

async function updateAddress(req, res) {
  let address = await addressCtrl.updateAddress(req.body).catch((err) => {
    res.json(400, {
      error: 1,
      msg: err,
    });
  });
  res.json(employee);
}

//POST
async function insertAddress(req, res) {
  let address = await addressCtrl.insertAddress(req.body, req.user._id).catch((err) => {
    res.json(400, {
      error: 1,
      msg: err,
    });
  });
  res.json(address);
}

async function insertAddressBranch(req, res) {
  let address = await addressCtrl.insertBranch(req.body);
  res.json(address);
}
//FIM POST

//DELETE
async function deleteAddress(req, res) {
  let address = await addressCtrl.deleteAddress(req.params.id).catch((err) => {
    res.json(400, {
      error: 1,
      msg: err,
    });
  });
  res.json(address);
}

async function deleteAddressBranch(req, res) {
  let address = await addressCtrl.deleteAddressBranch(req.params.id);
  res.json(address);
}
//FIM DELETE
