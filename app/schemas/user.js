/**
 * Created by zes on 2017/7/29.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var UserScheme = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    role:{
        type:Number,
        default:1
    },
    portraitUrl:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
UserScheme.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    var hash = bcrypt.hashSync(this.password);
    user.password = hash;
    next();
    //bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    //    if(err){
    //        return next(err);
    //    }
    //    bcrypt.hash(user.password,salt,function(err,hash){
    //        if(err){
    //            return next(err);
    //        }
    //        user.password = hash;
    //        next();
    //
    //    })
    //    //next();
    //});

})

UserScheme.methods = {
    comparePassword:function(_password,cb){
        //var userPassword = this.password;
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if(err){
                return cb(err);
            }
            console.log(isMatch);
            cb(null,isMatch);
        })
    }
}

UserScheme.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}
module.exports = UserScheme;