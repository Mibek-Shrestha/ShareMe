const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    section: {
        type: String,
        enum: ['teacher', 'student'],
        required: true
    }
});

const Register = mongoose.model('Register', SignUpSchema);

module.exports = Register;