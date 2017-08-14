/**
 * Created by zes on 2017/8/1.
 */
var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./pblic/uploads')
    },
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
        cb(null,file.fieldname+'-'+Date.noe()+fileFormat[fileFormat.length-1]);
    }
})
var upload = multer({
    storage:storage
})
module.exports = upload;