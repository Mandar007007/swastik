const express = require('express');
const { register, verifyOTP, login, loadUser } = require('../controllers/User');
const app = express();
const router = express.Router();

router.post('/register',register)
router.post('/verify',verifyOTP)
router.post('/login',login)
router.get('/me',loadUser)


module.exports = router