const Appointment = require("../Model/Appointment");
const Doctor = require("../Model/Doctor");

const getallAppointmentbyID = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('userId:', userId); // Log để kiểm tra giá trị userId
        const appointments = await Appointment.find({ doctorId: userId });

        if (!appointments) {
            return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.log('Lỗi tìm lịch hẹn', error);
        res.status(500).json({ message: error.message });
    }
};
const accepAppointment = async (req, res) => {
    try {
        const { pantient, doctor } = req.body;
        console.log(pantient, doctor); // Log để kiểm tra giá trị userId

        // Tìm lịch hẹn với doctorId và pantientId
        const appointments = await Appointment.findOne({ doctorId: doctor, pantientId: pantient });

        if (!appointments) {
            return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        }

        // Cập nhật trạng thái thành "Confirmed"
        appointments.status = "Confirmed";

        // Lưu cập nhật vào database
        await appointments.save();

        // Trả về kết quả thành công
        res.status(200).json(appointments);
    } catch (error) {
        console.log('Lỗi tìm lịch hẹn', error);
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getallAppointmentbyID };