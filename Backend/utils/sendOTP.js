const OTP = require('../models/otp');
const createUser = require('./createUser');
const generateOTP = require('./generateOTP');
const sendEmail = require('./sendEmail');

const sendOTP = async (email, role) => {
    let existingUser = await OTP.findOne({ email });
    if (existingUser) {
        console.log('User already exists. Replacing with new OTP...');
        await OTP.deleteOne({ email });
    }

    let { otp, expiresAt } = await generateOTP();
    await createUser(email, otp, expiresAt, role);
    await sendEmail(email, otp);
}
module.exports = sendOTP;