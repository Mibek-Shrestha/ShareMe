const Register = require('../models/signUp');
const File = require('../models/upload');
const bcrypt = require('bcryptjs');
const Upload = require('../models/upload');
const OTP = require('../models/otp');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, 'your-secret-key', {
    expiresIn: maxAge,
  });
};

const home = (req, res) => {
  res.render('index');
};
const login = (req, res) => {
  res.render('login');
};

const signUp = (req, res) => {
  res.render('SignUp');
};

const register = (req, res) => {
  const blog = new Register(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
const registered = async (req, res) => {
  try {
    // Check if user already exists
    let user = await Register.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({msg: 'User already exists'});
    }

    // Create new user
    user = new Register({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // You should hash this before saving
      section: req.body.section,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save user to database
    await user.save();

    res.send('User registered');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
const postLogin = async (req, res) => {
  let email = req.body.email;
  let otp = req.body.otp;
  if (!email || !otp) {
    return res.status(400).send('Missing email or OTP');
  }

  let user = await OTP.findOne({email});
  if (!user) {
    return res.status(404).send('User not found');
  }

  let isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    return res.status(400).send('Invalid OTP');
  }

  if (new Date(user.expiresAt) < Date.now()) {
    return res.status(400).send('OTP expired');
  }

  const token = createToken(user._id);

  res.cookie('notesharing', JSON.stringify({token}), {
    maxAge: maxAge * 1000,
    path: '/',
    secure: false,
  });
  return res.status(201).json({user: user._id, message: 'OTP verified'});
};

const upload = async (req, res) => {
  try {
    let category = req.body.category;
    if (category === 'other') {
      category = req.body.other;
    }

    const file = new File({
      category: category,
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await file.save();

    res.send('File uploaded and saved to database');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getFile = async (req, res) => {
  try {
    const file = await Upload.findById(req.params.id);
    var bytes = file.size;
    var megabytes = bytes / 1024 / 1024;

    if (!file) {
      return res.status(404).send('File not found');
    }
    res.render('singleFile', {file: file, sizeInMB: megabytes.toFixed(2)});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
const getAllFiles = async (req, res) => {
  try {
    const pdfs = await Upload.find();
    if (!pdfs || pdfs.length === 0) {
      return res.status(404).send('No PDF files found');
    }
    // If you want to send multiple PDFs, you may need to zip them or use another method to send multiple files
    // Here, I'm sending a response with an array of PDF IDs, assuming you'll retrieve them one by one in the frontend
    res.status(200).json(pdfs.map((pdf) => pdf._id));
  } catch (error) {
    console.error('Error retrieving PDF files:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  register,
  home,
  login,
  signUp,
  registered,
  postLogin,
  upload,
  getFile,
  getAllFiles,
};
