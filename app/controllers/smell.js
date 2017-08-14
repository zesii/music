/**
 * Created by zes on 2017/8/6.
 */
var Smell = require('../models/smell');

exports.save = function(req,res,next){
    //var musicStoryObj = req.body.musicStory;
    //var content = musicStoryObj.content;
    //var musicStoryId = musicStoryObj._id;
    var smell = req.body.smell;
    var user = req.body.user;
    var smellObj = {
        smell:smell,
        from:user
    }

    var smellId = smellObj._id;

    var _smell;
    if(smellId){
        Smell.findById(smellId,function(err,smell){
            if(err){
                console.log(err);
            }
            _smell = _.extend(smell,smellObj);
            _smell.save(function(err,smell){
                if(err){
                    console.log(err);
                }
                res.end('save');
            })
        })
    }else{
        _smell = new Smell(smellObj);
        _smell.save(function(err,smell){
            if(err){
                console.log(err);
            }
            res.end('save');
        })
    }
}