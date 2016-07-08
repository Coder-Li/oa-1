// department模式定义
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 定义数据类型
var UserSchema = new Schema({
    username: {
        unique: true,
        type: String
    },
    name: String,
    password: String,
    role: {
        type: Number,
        default: 0
    },
    //岗位
    station: {
        type: String,
    },   
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
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }
  next();
});

UserSchema.methods = {
    comparePassword: function(_password, cb){
        // bcrypt.compare(_password, this.password,function(err, isMatch){
        //     if(err){
        //         return cb(err);
        //     }
        //     cb(null, isMatch);
        // })
        if(_password === this.password){
            isMatch = true;
        }else{
            isMatch = false;
        }
            cb(null, isMatch);
    }
}

UserSchema.statics = {
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
module.exports = UserSchema 