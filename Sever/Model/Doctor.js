const mongoose = require('mongoose');

const doctor = new mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization' },// Chuyên môn
  address: { type: String, required: true },            // Địa chỉ công tác
  yearsOfExperience: { type: Number, required: true },  // Số năm kinh nghiệm
  certifications: [{ type: [String] }],                   // Các chứng chỉ
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }], // Tham chiếu đến lịch hẹn
  clinic: {type: mongoose.Schema.Types.ObjectId, ref:'Clinic'}
  },
    { timestamps: true }
  );
const Doctor = mongoose.model('Doctor', doctor);
module.exports = Doctor;