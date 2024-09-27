const Patient = require("../Model/Patient");
const getallpatient = async (req, res) => {
    try {
        const allpatient = await Patient.find();
        if (allpatient.length === 0) {
            console.log("No Pantients found");
        } else {
            console.log("All Pantients:", allpatient);
        }
        res.status(200).json(allpatient);
    } catch (error) {
        console.log("Error fetching Pantients:", error.message);
        res.status(500).json({ message: error.message });
    }
}
module.exports = {getallpatient};