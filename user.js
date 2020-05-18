/*
 * @Author: your name
 * @Date: 2020-05-12 17:14:44
 * @LastEditTime: 2020-05-17 17:00:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Node.js\crud-node-express\student.js
 */ 
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/userstudents', {useNewUrlParser: true, useUnifiedTopology: true})

var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);