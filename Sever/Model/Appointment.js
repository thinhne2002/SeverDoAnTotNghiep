const mongoose = require('mongoose');
const appointment = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu đến bệnh nhân
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Tham chiếu đến bác sĩ
    appointmentDate: { type: Date, required: true },   // Ngày hẹn
    appointmentTime: { type: String, required: true }, // Giờ hẹn
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }, // Trạng thái lịch hẹn
    notes: { type: String },                           // Ghi chú
  },
    { timestamps: true }
  );  
const Appointment = mongoose.model('Appointment', appointment);
module.exports = Appointment;