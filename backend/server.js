const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboardRoutes');
const instructor = require('./routes/instructorRoutes');
const courses = require('./routes/courseRoutes');

const enroll = require('./routes/enrollmentRoutes');
const admin = require('./routes/adminRoutes');

app.use('/api/auth', auth);
app.use('/api/dashboard', dashboard);
app.use('/api/instructor', instructor);
app.use('/api/courses', courses);
app.use('/api/enroll', enroll);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
