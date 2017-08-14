/**
 * Created by zes on 2017/7/25.
 */
var Artists = require('../models/artists');

//歌手页面
exports.artists = function(req,res,next){
    Artists
        .find({})
        .exec(function(err,artists){
            if(err){
                console.log(err);
            }
            res.render('artists',{
                artists:artists,
                title:'artists'
            })
        })

    //res.render('artists',{title:'artists'});
}
//歌手投票
exports.artistslove = function(req,res,next){
    var artistid = req.body.id;
    var type = req.body.type;
    var _artist;
    Artists
        .findById(artistid,function(err,artist){
            if(err){
                console.log(err);
            }
            //console.log(artist);
            if(type==1){
                artist.artistLove = artist.artistLove+1;
            }else{
                artist.artistLove = artist.artistLove-1;
            }
            artist.save(function(err,artistObj){
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

//后台保存歌手信息
exports.save = function(req,res,next){
    console.log(req.body.artist);
    var id = req.body.artist._id;
    var artistObj = req.body.artist;
    var _artist;
    if(id){
        Artists.findById(id,function(err,artist){
            if(err){
                console.log(err);
            }
            _artist = _.extend(artist,artistObj);
            _artist.save(function(err,artist){
                if(err){
                    console.log(err);
                }
                res.end('update save!!');
            })
        })
    }else{
        _artist = new Artists(artistObj);
        _artist.save(function(err,artist){
            if(err){
                console.log(err);
            }
            res.end('new save!!')
        })
    }
}