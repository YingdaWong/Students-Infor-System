/**
 * router.js 模块
 * 职责：
 *  处理路由
 *  根据不同请求方法+请求路径设置具体服务
 * 
 * 模块职责要单一，不要乱写
 * 划分模块的目的就是为了增强项目代码效率
 */
// var fs = require('fs')
var Student = require('./student')
var User = require('./user')

// express 提供了更好的方式专门用于路由封装
var express = require('express')

//1. 创建路由容器
var router = express.Router()

//2. 把路由都挂载到 router 容器中
/**
 * 首页为登录页
 */
router.get('/', function (req, res) {
    res.render('login.html')
})

/**
 * 处理登录请求
 */
router.post('/', function(req, res) {
    User.exists(req.body, function(err, result){
        if (err) {
            return result.status(500).send('Server error')
        } else if (result) {
            req.session.username = req.body.username
            res.redirect('/students')
        } else {
            res.send('用户名密码错误，请返回重试')
            return false
        }
    })
})

/**
 * 渲染学生列表页
 */
router.get('/students', function (req, res) {
    if(req.session.username) {
        Student.find(function (err, students) {
            if (err) {
                return res.status(500).send('Server error')
            }
            res.render('index.html', {
                //数据
                fruits:[
                    '苹果',
                    '香蕉',
                    '橘子',
                    '葡萄'
                ],
                students: students
            })
        })
    } else {
        res.redirect('/');
    }
})

/**
 * 渲染添加学生页面
 */
router.get('/students/new', function (req, res) { 
    if(req.session.username) {
        res.render('new.html')
    } else {
        res.redirect('/');
    }
})

/**
 * 处理添加学生请求
 * 成功后重定向到学生列表页
 * 新添加的学生信息在列表中显示
 */
router.post('/students/new', function (req, res) {
    //1. 获取表单数据
    //2. 处理
    //3. 发送响应
    // if(req.session.username) {
        new Student(req.body).save(function (err) {
            if (err) {
                return res.send('server error')
            }
            res.redirect('/students')
        })
    // } else {
    //     res.redirect('/');
    // }   
})

/**
 * 渲染编辑学生页面
 * 根据所选的学生将其待编辑的信息渲染到页面中，方便进行编辑
 */
router.get('/students/edit', function (req, res) {
    //1. 在客户端列表页中处理链接问题（页面给到 id 参数）
    //2. 后端获取 id 参数
    //3. 渲染编辑页面
    if(req.session.username) {
        Student.findById(req.query.id.replace(/"/g, ''), function (err, student) {
            if (err) {
                return res.statusCode(500).send('Server error')
            }
            res.render('edit.html', {
                student: student
            })
        })    
    } else {
        res.redirect('/');
    }   
})

/**
 * 处理编辑请求
 * 成功后重定向至学生列表页
 * 编辑后的信息得以展示
 */
router.post('/students/edit', function (req, res) {
    //1. 获取表单数据
    //2. 更新
    //  Student.updateById()
    //3. 响应
    Student.findByIdAndUpdate(req.body.id.replace(/"/g, ''), req.body, function (err) {
        if (err) {
            return res.statusCode(500).send('Server error')
        }
        res.redirect('/students')
    })
})

/**
 * 处理删除请求
 * 删除成功重定向至列表页
 * 已删除的信息不会再显示
 */
router.get('/students/delete', function (req, res) {

    if(req.session.username) {
        Student.findByIdAndRemove(req.query.id.replace(/"/g, ''), function (err) {
            if (err){
                return res.statusCode(500).send('Server error')
            }
            res.redirect('/students')
        })
    } else {
        res.redirect('/');
    }  
})

//3. 导出 router 
module.exports = router
