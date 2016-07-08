var express = require('express');
var router = express.Router();
// 上传需要组件
var multipartyMiddleware = require('connect-multiparty')();
var _ = require('underscore');

var Department = require('../app/controllers/department');
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');

module.exports = function (app){
    //定义路由
    // pre handle user
    app.use(function (req, res, next) {
        var _user = req.session.user;

        app.locals.user = _user;

        next();
    });
    // index
    app.get('/', Index.index);
    //Department
    app.get('/department', Department.getDate, Department.show);
    app.post('/department', Department.save);
    app.get('/department/:id', Department.getDate, Department.show);
    app.get('/department/edit/:id', Department.edit);
    app.get('/department/del/:id', Department.del);
    //User
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/logout', User.logout);
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);

}
