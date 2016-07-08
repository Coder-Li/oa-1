var User = require('../models/user');

exports.showSignup = function (req, res){
    res.render('signup', {
        title: '注册页面'
    })
}

exports.signup = function (req, res) {
    var _user = req.body.user;
    var userToSave = new User(_user);
    // req.param('user');    // not params     url>body>query
    console.log(_user);
    //用户名校验
    User.findOne({ name: _user.name }, function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user);
        if (user) {
            return res.redirect('/signin');
        } else {

            //密码校验代码

            //
            userToSave.save(function (err, user) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/');
            });
        }
    })
};

//signin page
exports.showSignin = function (req, res) {
    res.render('signin', {
        title: 'OA登录页面'
    });
};

exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    // console.log(_user);
    
    User.findOne({ name: name }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/signup');
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user;
                return res.redirect('/');
            } else {
                // return res.redirect
                console.log('Password is not matched');
                return res.redirect('/signin');
            }
        });
    });
};

//logout 
exports.logout = function (req, res) {
    delete req.session.user;
    delete app.locals.user;

    res.redirect('/');
};

// userlist page
exports.list = function (req, res) {
    console.log('1');
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    });
};

//midware for userlist
//判断是否登录
exports.signinRequired = function(req, res, next){
    var user = req.session.user;
    
    if(!user){
        return res.redirect('/signin');
    }
    
    next();
}
//判断权限
exports.adminRequired = function(req,res,next){
    // var user = req.session.user;
    
    // if(user.role <= 10){
    //     return res.redirect('/signin');
    // }
    
    next();
}
