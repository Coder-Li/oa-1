// department模式定义
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 定义数据类型
var DepartmentSchema = new Schema({
    name: String,
    topname: {
        type: String,
        default: '007'
    },
    description: String,
    downStreamDepartment: [{
        type: ObjectId,
        ref: 'Department'
    }],
    role: [{
        type: ObjectId,
        ref: 'Role'
    }],
    meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }  
})

//存数据前都会调用
DepartmentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }
  next();
});

DepartmentSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}
module.exports = DepartmentSchema 