const Doctor = require("../Model/Doctor");
const getalldoctor = async (req, res) => {
    try {
        const alldoctor = await Doctor.find();
        if (alldoctor.length === 0) {
            console.log("No Doctors found");
        } else {
            console.log("All Doctors:", alldoctor);
        }
        res.status(200).json(alldoctor);
    } catch (error) {
        console.log("Error fetching Doctors:", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getalldoctor};