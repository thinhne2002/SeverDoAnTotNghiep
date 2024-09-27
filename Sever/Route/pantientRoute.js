const express = require('express')
const router = express.Router();
const auth = require('../Middelware/auth');


const {getallpatient} = require("../Controller/pantientController")

router.get('/getallpatient',getallpatient);

module.exports = router;