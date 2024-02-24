require('dotenv').config();
require('./config/db');

const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');

const otp = require('./routes/otpRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(helmet());
app.use(express.static('./uploads/'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/api', noteRoutes);
app.use('/otp', otp);

module.exports = app;
