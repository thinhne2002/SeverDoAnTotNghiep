const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const appointment = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
},
  patientId: { type: String, ref: 'User', required: true }, // Tham chiếu đến bệnh nhân
  doctorId: { type: String, ref: 'User', required: true },   // Tham chiếu đến bác sĩ
  appointmentDate: { type: Date, required: true },   // Ngày hẹn
  appointmentTime: { type: String, required: true }, // Giờ hẹn
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }, // Trạng thái lịch hẹn
  notes: { type: String, required: true },                           // Ghi chú
  price: { type: String, required: true },
  address: { type: String, required: true },
},
  { timestamps: true }
);
const Appointment = mongoose.model('Appointment', appointment);
module.exports = Appointment;