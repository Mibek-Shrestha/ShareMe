const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: true
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    }
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;