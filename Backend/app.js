require('dotenv').config();
require('./config/db');

const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');


const otp = require('./routes/otpRoutes');
const noteRoutes = require('./routes/noteRoutes');

app.use(express.static('./uploads/'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());





app.set('view engine', 'ejs');


app.use('/api', noteRoutes);
app.use('/otp', otp);


module.exports = app;

