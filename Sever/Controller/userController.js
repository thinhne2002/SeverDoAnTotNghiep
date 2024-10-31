const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const dotenv = require('dotenv');
const multer = require("multer");
const path = require('path');
const Doctor = require("../Model/Doctor")
const Pantient = require("../Model/Patient")
const Appointment = require("../Model/Appointment")
dotenv.config();

//Redis
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
});

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

redisClient.connect();
//OTP Gmail
const nodeMailer = require("nodemailer");
// Khởi tạo transporter cho nodemailer
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenhoangthinh5902@gmail.com', // Email của bạn
        pass: 'kgmu krci tdvu dzeu' // Mật khẩu email của bạn
    }
});

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, {
        expiresIn: "7d"
    });
}
const sendOTP = async (req, res) => {
    try {
        const { userName, password, fullname, email, phoneNumber, birthday } = req.body;
        let user = await User.findOne({ $or: [{ email }, { userName }] });
        if (user) return res.status(400).json({ error: "Email hoặc Tên đăng nhập đã tồn tại." });
        if (!validator.isMobilePhone(phoneNumber, "vi-VN")) return res.status(400).json({ error: "Số điện thoại không hợp lệ." });
        user = await userModel.findOne({ phoneNumber });
        if (user) return res.status(400).json({ error: "Số điện thoại đã tồn tại." });
        if (!userName || !password || !email || !fullname || !birthday) return res.status(400).json({ error: "Bắt buộc nhập đầy đủ thông tin." });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ error: "Mật khẩu không đủ mạnh." });
        if (!validator.isEmail(email)) return res.status(400).json({ error: "Email không hợp lệ." });
        if (!validator.isMobilePhone(phoneNumber, "vi-VN")) return res.status(400).json({ error: "Số điện thoại không hợp lệ." });

        // Tạo mã OTP ngẫu nhiên
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("OTP: ", otp);
        const date = new Date();
        const dateStr = formatDate(date);
        const mailOptions = {
            from: "WEBSITEDATLICHKHAM",
            to: email,
            subject: 'Your OTP Code',
            html: htmlTemplate.replace('{{otp}}', otp).replace('{{date}}', dateStr).replace('{{fullname}}', fullname)
        };

        // Lưu mã OTP vào redis
        const registrationData = { userName, password, fullname, email, phoneNumber, birthday, otp };
        await redisClient.set(email, JSON.stringify(registrationData));

        // Đặt thời gian hết hạn cho mã OTP là 60 giây
        await redisClient.expire(email, 60);

        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to send OTP' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'OTP sent successfully' });
            }
        });
        res.status(200).json({ message: "Mã OTP đã được gửi đến email của bạn." });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Lỗi server." });
    }
}
const sendMailOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(404).json({ message: "Email đã tồn tại." });
        if (!validator.isEmail(email)) return res.status(400).json({ error: "Email không hợp lệ." });
        const otp = Math.floor(100000 + Math.random() * 900000);

        const date = new Date();
        const dateStr = formatDate(date);

        const mailOptions = {
            from: "WEBSITEDATLICHKHAM",
            to: email,
            subject: 'Your OTP Code',
            html: htmlTemplOTPMail.replace('{{otp}}', otp).replace('{{date}}', dateStr)
        };

        const regisOTP = { email, otp };

        await redisClient.set(email, JSON.stringify(regisOTP));

        await redisClient.expire(email, 60);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to send OTP' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'OTP sent successfully' });
            }
        });
        console.log("OTP: ", otp);
        res.status(200).json({ message: "Mã OTP đã được gửi đến email của bạn." });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Lỗi server." });
    }
};
const verifyOTP = async (req, res) => {
    try {
        const { email, OTP } = req.body;
        const regisOTP = await redisClient.get(email);
        if (!regisOTP) {
            return res.status(400).json({ error: "Mã OTP đã hết hạn." });
        }
        const { otp } = JSON.parse(regisOTP);
        if (!OTP) {
            return res.status(400).json({ error: "Vui lòng nhập mã OTP." });
        }
        if (OTP !== otp.toString()) {
            return res.status(400).json({ error: "Mã OTP không chính xác." });
        }
        await redisClient.del(email);

        res.status(200).json({ message: "Xác thực thành công." });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Lỗi server." });
    }
};
const registerUser = async (req, res) => {
    try {
        const { username, password, role, phone, email, gender, name, dateOfBirth } = req.body;
        let user = await User.findOne({
            $or: [
                { username: username },
                { email: email },
                { phone: phone }
            ]
        });
        if (user) { // Kiểm tra nếu user không phải null
            if (user.username === username) {
                return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
            }
            if (user.email === email) {
                return res.status(400).json({ error: "Email đã được đăng ký" });
            }
            if (user.phone === phone) {
                return res.status(400).json({ error: "Số Điện Thoại đã được đăng ký" });
            }
        }
        if (!username || !password || !name || !dateOfBirth || !gender || !role || !phone) return res.status(400).json({ error: "Bắt buộc nhập đầy đủ thông tin." });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ error: "Mật khẩu không đủ mạnh." });
        if (!validator.isMobilePhone(phone, "vi-VN")) return res.status(400).json({ error: "Số điện thoại không hợp lệ." });
        user = new User({ username, password, role, phone, email, gender, name, dateOfBirth });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // Xóa mã OTP khỏi Redis
        const token = createToken(user._id);
        res.status(200).json({ _id: user._id, user: username, password, role, phone, email, gender, name, dateOfBirth, token, fullUser: user });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Lỗi server." });
    }
};
const fs = require('fs');
const Patient = require("../Model/Patient");
const htmlTemplate = fs.readFileSync('./TemplateSendMail/template.html', 'utf8');
const htmlTemplOTPMail = fs.readFileSync('./TemplateSendMail/templatesendmail.html', 'utf8');


const getalluser = async (req, res) => {
    try {
        const alluser = await User.find();
        if (alluser.length === 0) {
            console.log("No users found");
        } else {
            console.log("All users:", alluser);
        }
        res.status(200).json(alluser);
    } catch (error) {
        console.log("Error fetching users:", error.message);
        res.status(500).json({ message: error.message });
    }
}
const getallDoctor = async (req, res) => {
    try {
        const role = req.query.role; // Lấy tham số từ query parameter
        // Truy vấn tất cả các bệnh nhân và populate tài khoản người dùng
        const allDoctor = await Doctor.find().populate({
            path: 'account', // Trường account chứa ID người dùng trong bảng Patient
            match: { role: 'Doctor' }, // Lọc role của người dùng
            select: 'username phone email name role' // Chỉ lấy các trường cần thiết từ User
        });
        // Lọc những bệnh nhân có thông tin tài khoản hợp lệ (nếu role không khớp thì account sẽ null)
        const filteredallDoctor = allDoctor.filter(doctor => doctor.account);
        res.status(200).json(filteredallDoctor); // Trả về danh sách bệnh nhân đã lọc
    } catch (error) {
        console.log('error', error.message); // Log lỗi
        res.status(500).json({ message: error.message }); // Trả về mã lỗi 500 nếu có lỗi xảy ra
    }
};
const getallPantient = async (req, res) => {
    try {
        const role = req.query.role; // Lấy tham số từ query parameter
        // Truy vấn tất cả các bệnh nhân và populate tài khoản người dùng
        const allPatients = await Patient.find().populate({
            path: 'account', // Trường account chứa ID người dùng trong bảng Patient
            match: { role: 'Patient' }, // Lọc role của người dùng
            select: 'username phone email name role' // Chỉ lấy các trường cần thiết từ User ()=>
        });
        // Lọc những bệnh nhân có thông tin tài khoản hợp lệ (nếu role không khớp thì account sẽ null)
        const filteredPatients = allPatients.filter(patient => patient.account);
        res.status(200).json(filteredPatients); // Trả về danh sách bệnh nhân đã lọc
    } catch (error) {
        console.log('error', error.message); // Log lỗi
        res.status(500).json({ message: error.message }); // Trả về mã lỗi 500 nếu có lỗi xảy ra
    }
};

const loginUser = async (req, res) => {
    try {
        const { account, password } = req.body;
        // Tìm người dùng dựa trên username, email, hoặc phone
        const user = await User.findOne({
            $or: [
                { username: account },
                { email: account },
                { phone: account },
            ],
        });
        if (!user) {
            return res.status(400).json({ error: "Thông tin đăng nhập không hợp lệ.", account, password });
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Mật khẩu không đúng." });
        }
        // Tạo token JWT
        const token = createToken(user._id);
        // Trả về thông tin người dùng và token
        res.status(200).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            email: user.email,
            phone: user.phone,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            avatar: user.avatar,
            token,
        });

        console.log("Đăng nhập thành công.");
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Lỗi server." });
    }
};

module.exports = { getalluser, getallDoctor, getallPantient, loginUser, sendMailOTP, verifyOTP, registerUser };