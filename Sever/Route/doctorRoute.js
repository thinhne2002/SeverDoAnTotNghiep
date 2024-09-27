const express = require('express')
const router = express.Router();
const auth = require('../Middelware/auth');
const {getalluser} = require("../Controller/userController")
const {getalldoctor} = require("../Controller/doctorController")



router.get('/getalldoctor',getalldoctor);

module.exports = router;