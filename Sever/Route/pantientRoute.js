const express = require('express')
const router = express.Router();
const auth = require('../Middelware/auth');
const { dangkylichhen, getallAppointmentbyID } = require('../Controller/pantientController');
const { getallDoctor } = require('../Controller/pantientController');

router.get('/getallDoctor', getallDoctor);
router.get('/getallAppointmentbyID/:userId', getallAppointmentbyID);
router.post('/dangkylichhen', dangkylichhen)

module.exports = router;