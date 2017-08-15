/**
 * Created by zes on 2017/7/25.
 */
var fs = require('fs');
var path = require('path');
var MusicStory = require('../models/musicStory');
var Smell = require('../models/smell')
var Music = require('../models/music');
var _ = require('underscore');
exports.showlist = function(req,res){
    //¸èÇú²¿·Ö
    var musicId = req.query.id;
    var media = path.join(__dirname,"../../public/media/album"+musicId);
    var _musicStories;
    var _smells;
    var albumId = musicId;

    fs.readdir(media,function(err,names){
        if(err){
            console.log(err);
        }else{
            var musics=[];
            for(var i =0;i<names.length;i++){
                var songTime = names[i].split('-')[0].trim();
                var artistName = names[i].split('-')[1].trim();
                var songName= (names[i].split('-')[2].trim()).split(".")[0];
                var music = {
                    songTime:songTime,
                    songName:songName,
                    artistName:artistName
                }
                musics.push(music);

            }
            MusicStory
                .find({albumId:albumId})
                .sort({stars:-1})
                .limit(5)
                .populate('from','name')
                .exec(function(err,musicStories){
                    if(err){
                        console.log(err);
                    }
                    _musicStories = musicStories;
                    Smell
                        .find({albumId:albumId})
                        .exec(function(err,smells){
                            _smells = smells;
                            res.render('musicPlay', { title: 'Music Player',musics:musics,id:musicId,musicStories:_musicStories,smells:_smells});

                        })

                })
        }
    })
}
exports.save = function(req,res){
    console.log(req.body.music);
    var id = req.body.music._id;
    var musicObj = req.body.music;
    var _music;
    if(id){
        Music.findById(id,function(err,music){
            if(err){
                console.log(err);
            }
            _music = _.extend(music,musicObj);
            _music.save(function(err,music){
                if(err){
                    console.log(err);
                }
                res.end('update save!!');
            })
        })
    }else{
        _music = new Music(musicObj);
        _music.save(function(err,music){
            if(err){
                console.log(err);
            }
            res.end('new save!!')
        })
    }

}