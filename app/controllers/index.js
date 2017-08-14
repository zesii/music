/**
 * Created by zes on 2017/7/25.
 */
var fs = require('fs');
var path = require('path');
var media = path.join(__dirname,"../../public/media");
var Music = require('../models/music')
var MusicStory = require('../models/musicStory');
exports.index = function(req,res){
    //fs.readdir(media,function(err,names){
    //    if(err){
    //        console.log(err);
    //    }else{
    //        res.render('index', { title: 'Music Player' ,music:names});
    //    }
    //})
    Music
        .find({})
        .exec(function(err,musics){
            if(err){
                console.log(err);
            }
            MusicStory.find({})
                .limit(3)
                .exec(function(err,musicStories){
                    //console.log(musicStories.length);
                    res.render('index',{
                        musics:musics,musicStories:musicStories
                    })
                })

        })
    //res.render('index', { title: 'Music Player'});
}