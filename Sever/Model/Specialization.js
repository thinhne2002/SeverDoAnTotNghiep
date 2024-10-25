const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const specialization = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  description: { type: String },
});

const Specialization = mongoose.model('Specialization', specialization);
module.exports = Specialization;