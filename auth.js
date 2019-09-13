const router = require('express').Router();
const express = require('express');
const path = require('path');

const multer = require('multer');

const Schema = require('./models/authSchema')

const bcrypt = require('bcrypt');


router.use(express.static('./public'))

const Storage = multer.diskStorage({
    destination: "./public/",
    filename: (req, file, cb) =>{
        cb(null, file.fieldname+"_"+ Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: Storage
}).single('image');



router.get('/login', getLogin = (req, res, next) =>{
    console.log("Inside getLogin");
     res.render('login')

} );

router.post('/login', (req, res, next) =>{
    console.log("Inside postLogin");
    const email = req.body.email;
    const password = req.body.password;

     Schema.findOne({email: email})
     .then(user =>{
         console.log(user)
         const doMatch = bcrypt.compareSync(password, user.password);
         console.log(doMatch);
         if(doMatch){
             console.log("./public/"+user.uploadimage)
             return res.render('home', {data: user, message: "home Page"})
         }

     }).catch(err => console.log(err))


});



router.get('/', (req, res, next) =>{
    console.log("Inside get SignUp");
    res.render("signup", {pagetitle: 'signup'});
});



router.post('/signup', upload,  (req, res, next) =>{
    const success = req.file.filename + "uploaded success";

    const email = req.body.email;
    const nickName = req.body.nickname;
    const password = req.body.password;
    const image = req.file.filename

    const hashedPassword = bcrypt.hashSync(password, 12);

    const User = new Schema({
         email: email,
         nickname: nickName,
         password: hashedPassword,
         uploadimage: image
    })
    User.save((err, doc) =>{
        if(!err){
            return res.status(201).redirect('/login');
        }
    })

}
    )

module.exports = router