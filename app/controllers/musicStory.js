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
    var albumId = req.body.albumId;
    var musicStoryObj = {
        content:content,
        from:user,
        albumId:albumId
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
            var musicStoryId = musicStory._id;

            if(err){
                console.log(err);

            }
            res.end('save '+musicStoryId);

        })
    }
}
exports.star = function(req,res,next){
    var musicStoryId = req.body.id;
    var type = req.body.type;
    var _musicStory;
    //console.log(req.body);
    MusicStory
        .findById(musicStoryId,function(err,musicStory){
            if(err){
                console.log(err);
            }
            //console.log(artist);
            if(type==-1){
                musicStory.stars = musicStory.stars+1;
            }else{
                musicStory.stars = musicStory.stars-1;
            }
            musicStory.save(function(err,musicStoryObj){
                if(err){
                    console.log(err);
                }
                if(type=='1'){
                    res.end('1');
                }else{
                    res.end('-1');
                }
            })

        })
}