var Department = require('../models/department');

exports.show = function (req, res){
    var departs = req.body.departs;
    if(departs.length == 0){
        departs = [{name:'请添加部门'},{name:'请添加部门'}];
    }else if(departs.length == 1){
        departs.push({name:'请添加部门'});
    }
    res.render('department',{
    title: '部门',
    departments: departs
  })
}

exports.getDate = function(req, res, next){
    var id = req.params.id || 'Undefined';
    if(id != 'Undefined'){
        Department.findById(id, function(err, department){
            if(err) console.log(err);

            Department.fetch(function(err, departments){
                if(err) console.log(err);
                var departs = [];
                departments.forEach(function(element) {
                    if(element.topname == department.name){
                        departs.push(element);
                    }
                        req.body.departs = departs;
                        console.log(departs + '***' + departs.length);
                        next();
                }, this);
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
   console.log(_depart);

   var department = new Department(_depart);
   department.save(function(err, department){
      if(err){
        console.log(err);
      }

      res.redirect('/department')
   })
}
