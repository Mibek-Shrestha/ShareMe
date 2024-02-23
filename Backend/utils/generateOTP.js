const generateOTP = async () => {
    let otp = Math.floor(1000 + Math.random() * 9000).toString();
    let expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires after 15 minutes
    console.log('otp:', otp);
    return { otp, expiresAt };
}
module.exports = generateOTP;