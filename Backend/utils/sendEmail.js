const nodemailer = require('nodemailer');

const sendEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'replywithin24hr@gmail.com',
            pass: 'fhyazuszelftikhx'
        }
    });

    let mailOptions = {
        from: 'replywithin24hr@gmail.com',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is ${otp}`,
        html: `<b>Your OTP is ${otp}</b>`
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('OTP sent: %s', info.messageId);
}

module.exports = sendEmail;