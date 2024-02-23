const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note');
const multer = require('multer');
const path = require('path');

// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
});






router.get('/', noteController.home);
router.get('/login', noteController.login);
router.get('/signUp', noteController.signUp);
router.post('/register', noteController.register);
router.post('/signup', noteController.registered);
router.post('/login', noteController.postLogin);
router.post('/upload', upload.single('file'), noteController.upload);
router.get('/getAllFiles/', noteController.getAllFiles);
router.get('/files/:id', noteController.getFile);



module.exports = router;