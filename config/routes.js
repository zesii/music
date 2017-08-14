/**
 * Created by zes on 2017/7/25.
 */
//var fs = require('fs');
//var path = require('path');
//var media = path.join(__dirname,"../public/media");
var Index = require('../app/controllers/index');
var Artists = require('../app/controllers/artists');
var MusicPlay = require('../app/controllers/musicPlay');
var MusicStory = require('../app/controllers/musicStory');
var User = require('../app/controllers/user');
var Smell = require('../app/controllers/smell');
//var multer = require('multer');
//var upload = multer({dest:'uploads/'});
module.exports = function(app){

    app.use(function(req,res,next){
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    })

    //处理主页内容
    app.get('/',Index.index);

    //处理歌手页面
    app.get('/artists',Artists.artists);
    app.post('/artists/love',User.ajaxSigninRequired,Artists.artistslove)


    //处理音乐类型
    app.get('/musicType',function(req,res,next){
        res.render('musicType',{title:'musicType'});
    })



    //处理音乐播放和用户评论和音乐味道
    app.get('/musicPlay',MusicPlay.showlist);
    app.post('/musicStory/new',User.signinRequired,MusicStory.save);
    app.post('/musicSmell/new',User.signinRequired,Smell.save)

    //处理用户相关内容
    app.get('/signin',User.showSignin);
    app.get('/signup',User.showSignup);
    app.post('/user/checkUsername',User.checkUsername);

    app.post('/user/signup',User.signup);//注册相关
    app.post('/user/signin',User.signin);//登录相关
    app.get('/logout',User.logout);//退出登录





    //后台管理页面
    app.get('/admin',User.adminRequired,function(req,res,next){
        res.render('admin');
    })
    app.post('/admin/music',User.adminRequired,MusicPlay.save);
    app.post('/admin/artists',User.adminRequired,Artists.save)

}
