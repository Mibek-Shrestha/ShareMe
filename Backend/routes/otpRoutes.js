const express = require('express');
const router = express.Router();

const sendOTP = require('../utils/sendOTP');

// Express middleware
router.use((req, res, next) => {
  req.rawBody = '';
  req.on('data', (chunk) => {
    req.rawBody += chunk;
  });
  next();
});

// Express route
router.post('/sendOTP', async (req, res) => {
  console.log(req.rawBody);
  let email = req.body.email;
  let role = req.body.role;
  if (!email || !role) {
    res.status(400).send('Missing email or role');
    return;
  }
  await sendOTP(email, role);
});

module.exports = router;
