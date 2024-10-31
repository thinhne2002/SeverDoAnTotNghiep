const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const doctor = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,

  },
  account: { type: String, ref: 'User' },
  specialization: { type: String, ref: 'Specialization' },// Chuyên môn
  address: { type: String, required: true },            // Địa chỉ công tác
  yearsOfExperience: { type: Number, required: true },  // Số năm kinh nghiệm
  certifications: [{ type: [String] }],                   // Các chứng chỉ
  appointments: [{ type: String, ref: 'Appointment' }], // Tham chiếu đến lịch hẹn
  clinic: { type: String, ref: 'Clinic' }
},
  { timestamps: true }
);
const Doctor = mongoose.model('Doctor', doctor);
module.exports = Doctor;