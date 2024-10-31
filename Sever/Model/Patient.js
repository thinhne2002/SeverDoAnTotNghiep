const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const patient = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,

  },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },               // Tên bệnh nhân
  address: { type: String, required: true },            // Địa chỉ
  medicalHistory: { type: [String] },                   // Tiền sử bệnh
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }] // Tham chiếu đến lịch hẹn
});

const Patient = mongoose.model('Patient', patient);
module.exports = Patient;
