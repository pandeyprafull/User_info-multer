const express = require('express');

const path = require('path')

const ejs = require('ejs');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const authRoutes = require('./auth');

const app = express();

const DB_URL = "mongodb+srv://max2:max123@cluster0-3tcuc.mongodb.net/Stickman?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views');

app.use('/', authRoutes);


app.listen(process.env.PORT || 3000, ()=>{
    console.log("server started...");
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
        if(!err){
            console.log("DB connect successfully")
        }
    })
})