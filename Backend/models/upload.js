const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    data: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h'
    }
});

module.exports = mongoose.model('File', FileSchema);