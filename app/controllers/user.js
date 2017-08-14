/**
 * Created by zes on 2017/7/29.
 */
var User = require('../models/user');
//var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
//var multer = require('../controllers/multerPic');

//var multer = require('multer');
//var upload = multer({dest:'uploads/',filename:'test.jpg'}).array('user');
//var multer = require('multer');
//var upload = multer();

exports.showSignin = function(req,res){
    res.render('signin',{
        title:'登录页面',
        passwordErr:"",
    })
}

exports.showSignup = function(req,res){
    //console.log("hello")
    res.render('signup',{
        title:'注册页面'
    })
}

exports.checkUsername = function(req,res){
    var userName = req.body.name;
    User.findOne({name:userName},function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            res.end("the userName is taken");
        }else{
            res.end("the userName is ok");
        }
    })
}



//signup注册用户
exports.signup =function(req,res){
    var _user = req.body.user;
    //var upload = multer();

   //upload(req,res,function(err){
   //    if(err){
   //        console.log(err);
   //        return;
   //    }
   //    console.log()
   //    res.end("ok");
   //})
    //var form = new formidable.IncomingForm();
    ////var form = new formidable.IncomingForm({ uploadDir: __dirname + '/uploaded' });
    //form.encoding = 'utf-8';
    //form.maxFieldsSize = 2 * 1024 * 1024;
    //form.multiples = true;
    //form.uploadDir = __dirname+'../public/images/user';//修改上传到的路径，默认在c盘
    //console.log(form.uploadDir);
//    form.parse(req,function(err,fields,files){
//        if(err){
//            console.log(err);
//        }
//        console.log(fields);
//        console.log(files);
//        //var fileType = files.file.name.split(".")[1];//获得文件的类型（方法可能不是很好）
//        //var newFileName = 'demo2.'+fileType;
//        //fs.renameSync(files.file.path,'../../public/images/user/'+newFileName);
//        //将上传的临时文件改成新的可标识的文件，files的file字段是在表单里规定的。
////path是上传到的路径。
//        res.end('upload complete');
//    })



    var newuser = new User(_user);
    //console.log(_user);
    User.findOne({name:_user.name},function(err,user){
        //console.log(user);
        if(err){
            console.log(err);
        }
        if(user){
            return res.redirect('/signin')
        }else{
            newuser.save(function(err,user){
                if(err){
                    console.log(err);
                }
                //console.log("in");
                req.session.user = user;
                res.redirect('/')
            })
        }
    })

}

//sign in登录用户
exports.signin = function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    console.log(name,password);


    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup')
        }

        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                console.log("password is match")
                req.session.user = user;
                return res.redirect('/')

            }else{
                return res.render('signin',{passwordErr:'密码不正确'});
                //return res.redirect('/signin')
                //console.log('password is not matched');
            }
        })
    })

}

//logout
exports.logout = function(req,res){
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
}

//userlist 页面
exports.list = function(req,res){
    //console.log("in");
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render('userlist',{
            title:'用户列表页',
            users:users
        })
    })
}



//midware for user
//对ajax请求的重定向
exports.ajaxSigninRequired = function(req,res,next){

    var user = req.session.user;
    //console.log(user==undefined);
    if(user==undefined){
        console.log("in")
        //return res.redirect('/signin');
        return res.end('redirect');
    }
    next();
}
//对正常post/get的重定向
exports.signinRequired = function(req,res,next){

    var user = req.session.user;
    //console.log(user==undefined);

    if(user==undefined){
        console.log("in")
        return res.redirect('/signin');
        //return res.end('redirect');
    }
    next();
}

//midware for user
exports.adminRequired = function(req,res,next){

    var user = req.session.user;
    if(user === undefined){
        return res.redirect('/signin');
    }
    if(user.role == undefined){
        user.role = 0;
    }
    if(user.role<=10){
        //console.log("*************break")
        return res.redirect('/signin');
    }
    next();
}