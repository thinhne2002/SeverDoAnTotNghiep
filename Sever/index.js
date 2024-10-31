const express = require('express')
const port = 5000
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./Route/userRoute');
const doctorRoute = require('./Route/doctorRoute');
const pantientRoute = require('./Route/pantientRoute');
const cors = require('cors'); // Đảm bảo import cors trước

dotenv.config();

// Cấu hình CORS trước khi khai báo các route
app.use(cors({
  origin: 'http://localhost:3000', // URL của ứng dụng React
  credentials: true, // Nếu cần gửi cookie
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định nghĩa các route sau CORS middleware
app.use('/api/user', userRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/pantient', pantientRoute);

mongoose.connect(process.env.ATLATS_URI).then(() => {
  console.log("Database connected...");
}).catch((err) => console.log("MongoDB connection failed: ", err.message));

app.get("/", (req, res) => {
  console.log("Welcome to Project...!", req.session);
  res.send("Welcome to Project...!");
});

app.listen(port, () => {
  console.log('Server running on port ' + port)
});
