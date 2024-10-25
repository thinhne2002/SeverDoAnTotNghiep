const Patient = require("../Model/Patient");
const User = require("../Model/User");
const Appointment = require('../Model/Appointment');
const Doctor = require('../Model/Doctor');

const dangkylichhen = async (req, res) => {
    try {
        // Lấy id bệnh nhân đăng ký khám với id bác sĩ nào
        const { patientId, doctorId, date, time, status, notes, price, address } = req.body;
        // Kiểm tra xem các trường có bị rỗng không
        if (!patientId || !doctorId || !date || !time || !price || !address || !status || !notes || !price || !address) {
            res.status(400).json({ patientId, doctorId, date, time, status, notes, price, address });
            return res.status(400).json({ error: "Thông tin bệnh nhân, bác sĩ, ngày và giờ hẹn không được để trống" });
        }
        // Lấy thời gian hiện tại
        const currentDate = new Date();
        const appointmentDateTime = new Date(`${date}T${time}`);
        // Kiểm tra thời gian hẹn phải lớn hơn thời gian hiện tại
        if (appointmentDateTime <= currentDate) {
            return res.status(400).json({ error: "Thời gian hẹn phải lớn hơn thời gian hiện tại" });
        }
        // Kiểm tra xem bác sĩ có tồn tại không (giả sử bạn kiểm tra qua User model)
        const receiver = await User.findOne({ _id: doctorId });
        // Nếu bác sĩ không tồn tại
        if (!receiver) {
            return res.status(500).json({ error: "Người này không tồn tại" });
        }
        // Kiểm tra xem đã tồn tại lịch hẹn của bệnh nhân và bác sĩ chưa
        const checkAppointment = await Appointment.findOne({ patientId: patientId, doctorId: doctorId });
        // Nếu đã có lịch hẹn, trả về lỗi
        if (checkAppointment) {
            return res.status(500).json({ error: "Lịch hẹn đang được đăng ký, chờ xác nhận của bác sĩ" });
        }
        // Tạo lịch hẹn mới nếu tất cả kiểm tra đều đạt yêu cầu
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            appointmentDate: date,
            appointmentTime: time,
            status,
            notes,
            price,
            address
        });
        await newAppointment.save();
        // Trả về phản hồi thành công
        res.status(200).json({ message: "Đã đăng ký lịch hẹn, vui lòng đợi bác sĩ xác nhận" });
    }
    catch (error) {
        // Xử lý lỗi và in ra console
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
const getallAppointmentbyID = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('userId:', userId); // Log để kiểm tra giá trị userId
        const appointments = await Appointment.find({ patientId: userId });

        if (!appointments) {
            return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.log('Lỗi tìm lịch hẹn', error);
        res.status(500).json({ message: error.message });
    }
};
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
module.exports = { dangkylichhen, getallAppointmentbyID, getallDoctor };