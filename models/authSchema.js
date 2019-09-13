const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const model = new Schema({
    email: {type: String },
    nickname: {type:String},
    password: {type: String},
    uploadimage: { type: String }
})

const mongooseModel = mongoose.model("auth", model);

module.exports = mongooseModel;