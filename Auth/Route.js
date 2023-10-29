const User = require("../model/user")
const express = require("express")
const router = express.Router()
const { register } = require("./Auth")
router.route("/register").post(register)
module.exports = router


const { login } = require("./Auth");

router.route("/login").post(login);
module.exports = router;

const { update } = require("./Auth");
router.route("/update").put(update);

const { deleteUser } = require("./Auth");
router.route("/deleteUser").delete(deleteUser);

const { adminAuth } = require("../middleware/auth")
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)