var express = require('express');
var router = express.Router();
// 上传需要组件
var multipartyMiddleware = require('connect-multiparty')();
var _ = require('underscore');

var Department = require('../app/controllers/department');
var Index = require('../app/controllers/index');


module.exports = function (app){
    //定义路由
    // pre handle user

    // index
    app.get('/', Index.index);
    //Department
    app.get('/department', Department.getDate, Department.show);
    app.post('/department', Department.save);
    app.get('/department/:id', Department.getDate, Department.show);
}
