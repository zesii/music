/**
 * Created by zes on 2017/7/28.
 */
var MusicStory = require('../models/musicStory');

exports.save = function(req,res,next){
    //var musicStoryObj = req.body.musicStory;
    //var content = musicStoryObj.content;
    //var musicStoryId = musicStoryObj._id;
    var content = req.body.content;
    var user = req.body.user;
    var musicStoryObj = {
        content:content,
        from:user
    }
    var musicStoryId = musicStoryObj._id;//注意这个是评论的_id


    var _musicStory;
    if(musicStoryId){
        MusicStory.findById(musicStoryId,function(err,musicStory){
            if(err){
                console.log(err);
            }
            _musicStory = _.extend(musicStory,musicStoryObj);
            _musicStory.save(function(err,musicStory){
                if(err){
                    console.log(err);
                }
                res.end('update save!!');
            })
        })
    }else{
        //console.log("no id")
        _musicStory = new MusicStory(musicStoryObj);
        _musicStory.save(function(err,musicStory){
            if(err){
                console.log(err);

            }
            res.end('save')

        })
    }
}