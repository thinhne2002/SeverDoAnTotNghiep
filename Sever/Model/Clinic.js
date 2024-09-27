const mongoose = require('mongoose');
const clinic = new mongoose.Schema({
    name: { type: String, required: true }, // Tham chiếu đến bệnh nhân
    doctorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    address: {type: String, required: true },// địa chỉ
    appointment:[{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true}],
    specialization:[{type: mongoose.Schema.Types.ObjectId, ref: 'Specialization', required: true}]
  },
    { timestamps: true }
  );  
const Clinic = mongoose.model('Clinic', clinic);
module.exports = Clinic;