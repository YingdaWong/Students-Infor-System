/*
 * @Author: your name
 * @Date: 2020-05-17 15:41:30
 * @LastEditTime: 2020-05-18 11:43:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Node.js\crud-express-log-in\app.js
 */ 
/**
 * app.js 入口模块
 * 职责： 
 *  启动服务
 *  做一些服务相关配置
 *      模板引擎
 *      body-parser 解析表单 Post 请求体
 *      提供静态资源
 *  挂载路由
 *  监听端口启动服务
 */

//引入
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

//创建并启动服务器
var app = express()

//开放静态资源：模组 & public 
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置模板引擎
app.engine('html', require('express-art-template'))

//配置 session 中间件，处理登录请求
app.use(session({
    name: 'login',
    secret: 'adayu',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 60 * 5  // 有效期，单位是毫秒
    }
}));

// 配置 body-parser 中间件，处理 post 请求
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//把路由容器挂载到服务中
app.use(router)

// router(app)

//监听端口： 3000
app.listen(3000, function(){
    console.log('Running...')
})