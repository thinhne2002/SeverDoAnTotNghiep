const mongoose = require('mongoose');
const specialization = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
  });
  
const Specialization = mongoose.model('Specialization', specialization);
module.exports = Specialization;