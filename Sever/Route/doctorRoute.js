const express = require('express')
const router = express.Router();
const auth = require('../Middelware/auth');
const { getallAppointmentbyID } = require('../Controller/doctorController');

router.get('/getallAppointmentbyID/:userId', getallAppointmentbyID);

module.exports = router;