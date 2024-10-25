const express = require('express')
const router = express.Router();
const auth = require('../Middelware/auth');
const {getalluser, loginUser, sendMailOTP, verifyOTP, registerUser, getallDoctor, getallPantient} = require("../Controller/userController");


router.get('/getalluser',auth,getalluser);//chỉ có admin được dùng
router.get('/getallDoctor', getallDoctor);//cả bệnh nhân và admin được dùng
router.get('/getallPantient', getallPantient);//chức năng chỉ có admin dùng
router.post('/loginUser', loginUser)
router.post('/sendmailOTP',sendMailOTP)
router.post('/verifyOTP',verifyOTP)
router.post('/registerUser',registerUser)

module.exports = router;    