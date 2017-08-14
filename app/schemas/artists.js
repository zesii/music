/**
 * Created by zes on 2017/7/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var i = 0;
var ArtistsSchema = new Schema({
    artistName:String,
    artistLove:Number,
    artistCountry:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            dedaulr:Date.now()
        }
    }
})
ArtistsSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})
ArtistsSchema.statics = {
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
    },
    findByCountry:function(country,cb){
        return this
            .find({country:country})
            .exec(cb)
    }
}
module.exports = ArtistsSchema;