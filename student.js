/*
 * @Author: your name
 * @Date: 2020-05-12 17:14:44
 * @LastEditTime: 2020-05-18 11:23:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Node.js\crud-node-express\student.js
 */ 
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/userstudents', {useNewUrlParser: true, useUnifiedTopology: true})

var Schema = mongoose.Schema

var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender:{
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
    },
    age:{
        type: Number
    },
    hobbies: {
        type: String
    }
})

module.exports = mongoose.model('Student', studentSchema);