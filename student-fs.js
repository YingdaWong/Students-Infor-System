/**
 * student.js 
 * 数据操作模块
 * 职责：
 *  操作文件中的数据
 *  只处理数据，不关心业务
 */
var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取所有学生
 * return[]
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 根据 id 查找单个学生
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var result = students.find((item) => item.id === parseInt(id))
        callback(null, result)
    })
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1

        //添加进 students 对象
        students.unshift(student)
        
        //转字符串
        var result = JSON.stringify({
            students: students
        })

        //写入文件
        fs.writeFile(dbPath, result, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        
        student.id = parseInt(student.id)

        //修谁找谁
        //ES6 方法 find
        //
        var stu = students.find((item) => item.id === student.id)
        
        for (const key in student) {
            stu[key] = student[key]
        }

        //转字符串
        var result = JSON.stringify({
            students: students
        })

        //写入文件
        fs.writeFile(dbPath, result, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除学生
 */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        //findIndex 专门用来根据条件查找下标
        var deletetId  = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })

        //根据下标从数组中删除
        students.splice(deletetId, 1)

        //转字符串
        var result = JSON.stringify({
            students: students
        })

        //写入文件
        fs.writeFile(dbPath, result, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
} 