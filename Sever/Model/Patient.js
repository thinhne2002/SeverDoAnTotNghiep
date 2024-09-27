const mongoose = require('mongoose');
const patient = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },               // Tên bệnh nhân
    address: { type: String, required: true },            // Địa chỉ
    medicalHistory: { type: [String] },                   // Tiền sử bệnh
    appointments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }] // Tham chiếu đến lịch hẹn
  });
  
  const Patient = mongoose.model('Patient', patient);
  module.exports = Patient;
 