/**
 * Created by zes on 2017/7/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var i = 0;
var MusicStorySchema = new Schema({
    //title:String,
    content:String,
    from:{type:ObjectId,ref:'User'},
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
MusicStorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})
MusicStorySchema.statics = {
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
module.exports = MusicStorySchema;
