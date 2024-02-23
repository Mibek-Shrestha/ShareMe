const OTP = require('../models/otp');
const hashOTP = require('./hashOTp');

const createUser = async (email, otp, expiresAt, role) => {
    let hashedOTP = await hashOTP(otp);
    let user = new OTP({ email, otp: hashedOTP, createdAt: new Date(), expiresAt, role });
    await user.save();
}
module.exports = createUser;