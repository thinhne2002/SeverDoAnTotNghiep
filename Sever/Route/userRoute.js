const express = require('express')
const router = express.Router();
const auth = require('../Middelware/auth');
const {getalluser,getalluserDoctor, loginUser, sendMailOTP, verifyOTP, registerUser} = require("../Controller/userController")


router.get('/getalluser',getalluser);
router.get('/getalluserDoctor', getalluserDoctor);
router.post('/loginUser', loginUser)
router.post('/sendmailOTP',sendMailOTP)
router.post('/verifyOTP',verifyOTP)
router.post('/registerUser',registerUser)
module.exports = router;    