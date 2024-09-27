const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String,required: true,trim: true},
    role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], required: true },
    phone: { type: String, required: true,unique: true  },              // Số điện thoại
    email: { type: String, required: true, unique: true },// Email (duy nhất)
    gender: {type: String, enum:['Nam','Nữ'] },
    name:{type: String, required: true},
    dateOfBirth: { type: Date, required: true }, 
    avatar: {
        type: String, // URL của ảnh đại diện
        default: 'https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-trang-0wMZxcl.jpg' // Không bắt buộc
    }
},
{ timestamps: true }
);  

module.exports = mongoose.model('User',userSchema);
