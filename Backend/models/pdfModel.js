// PdfModel.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
});

module.exports = mongoose.model('Pdf', pdfSchema);
