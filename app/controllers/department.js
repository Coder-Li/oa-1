var Department = require('../models/department');
var _ = require('underscore');

exports.show = function (req, res){
    var id = req.params.id || undefined;
    var departs = req.body.departs;
    if(departs.length == 0){
        departs = [{name:'请添加部门'},{name:'请添加部门'}];
    }else if(departs.length == 1){
        departs.push({name:'请添加部门'});
    }
    if(id != undefined){
        Department.findById(id, function(err, department){
            if(err) console.log(err)

            var top = department.name;
            res.render('department', {
                title: '部门',
                departments: departs,
                top : top
            })
        })
    }else{
        res.render('department',{
        title: '部门',
        departments: departs,
        top: undefined
        })
    }
}

exports.getDate = function(req, res, next){
    var id = req.params.id || undefined;
    if(id != undefined){
        Department.findById(id, function(err, department){
            if(err) console.log(err);

            Department.fetch(function(err, departments){
                if(err) console.log(err);
                var departs = [];
                departments.forEach(function(element) {
                    if(element.topname == department._id){
                        departs.push(element);
                    }
                }, this);
                req.body.departs = departs;
                console.log(departs + '***' + departs.length);
                next();
            })
        })
    }else{
        Department.fetch(function(err, departments){
            if(err)  console.log(err);
            req.body.departs = departments;
            next();
        })
    }
}

exports.save = function(req, res){
   var _depart = req.body.depart;
   

   if(_depart._id){
        //修改数据
        console.log('修改');
        Department.findById(_depart._id, function(err, department){
            if(err){
                console.log(err);
            }

            var departmentObj = _.extend(department, _depart);
            Department.update({_id: department._id}, {$set:{name:departmentObj.name, topname:departmentObj.topname, description:departmentObj.description}},function(err, departmentObj){
                if(err) console.log(err);
                res.redirect('/department');
            })
        })

   }else{
        //新增数据
        console.log('添加');
        var department = new Department(_depart);
        department.save(function(err, department){
            if(err){
                console.log(err);
            }
            res.redirect('/department')
        })
   }
}

exports.edit = function(req, res){
    var id = req.params.id;
    if(id){
        Department.findById(id, function(err,department){
            if(err) console.log(err);
            
            res.render('department_edit', {
                title: '部门编辑',
                department: department
            })
        })
    }else{
        res.redirect('/department')
    }
}

exports.del = function(req, res){
    var id = req.params.id;
    if(id){
        Department.remove({_id: id}, function(err, department){
            if(err)  console.log(err);
            res.redirect('/department');
        })
    }else{
        res.redirect('/department');
    }
}