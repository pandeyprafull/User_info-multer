const authSchema = require('../models/authSchema')
const multer = require('multer');
const router = require('../api/routes/auth');
const path = require('path');
const bcrypt = require('bcrypt');

exports.getSignUp =



exports.getLogin = (req, res, next) =>{
    console.log("Inside getLogin");
     res.render('login')

}

exports.postLogin = 