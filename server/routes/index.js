const express = require('express');
const signupUser = require('../controller/signupUser');
// const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const userDetail = require('../controller/userDetail');
const logout = require('../controller/logout');
const updateUserDetail = require('../controller/updateUserDetail');
const login = require('../controller/login');
const checkEmail = require('../controller/checkEmail');
const searchUser = require('../controller/searchUser');

const router = express.Router();

//create API
router.post('/signup', signupUser);

//check user email
// router.post('/login', login);
router.post('/email', checkEmail)

//check user password
 router.post('/password', checkPassword);

//login user detail
router.get('/userdetail', userDetail);

//logout user
router.get('/logout', logout);

//update user
router.post('/updateuser', updateUserDetail);

//search user
router.post('/searchuser', searchUser);

module.exports = router;