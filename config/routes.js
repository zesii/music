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

    //������ҳ����
    app.get('/',Index.index);

    //�������ҳ��
    app.get('/artists',Artists.artists);
    app.post('/artists/love',User.ajaxSigninRequired,Artists.artistslove)


    //������������
    app.get('/musicType',function(req,res,next){
        res.render('musicType',{title:'musicType'});
    })



    //�������ֲ��ź��û����ۺ�����ζ��
    app.get('/musicPlay',MusicPlay.showlist);
    app.post('/musicStory/new',User.signinRequired,MusicStory.save);
    app.post('/musicSmell/new',User.signinRequired,Smell.save)

    //�����û��������
    app.get('/signin',User.showSignin);
    app.get('/signup',User.showSignup);
    app.post('/user/checkUsername',User.checkUsername);

    app.post('/user/signup',User.signup);//ע�����
    app.post('/user/signin',User.signin);//��¼���
    app.get('/logout',User.logout);//�˳���¼





    //��̨����ҳ��
    app.get('/admin',User.adminRequired,function(req,res,next){
        res.render('admin');
    })
    app.post('/admin/music',User.adminRequired,MusicPlay.save);
    app.post('/admin/artists',User.adminRequired,Artists.save)

}
