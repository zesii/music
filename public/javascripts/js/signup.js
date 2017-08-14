/**
 * Created by zes on 2017/7/29.
 */

var $userName = $('.userName');
var userNameFlag = false;
var $password = $('.userPassword');
var passwordFlag = false;
var $rePassword = $('.userRepassword');
var rePasswordFlag = false;
var $submitBtn = $('.formSubmit');

$userName.blur(function(){
    var name = $userName.val().trim();
    if(name==""){
        $('.userNameTip').text('请输入用户名').show();
        $('.userNameOK').hide();
        $('.userNameErr').hide();
        userNameFlag = false;
        return;
    }
    //console.log(name.length)
    if(!(2<=name.length && name.length<=14)){
        $('.userNameTip').text('用户名长度在2~14之间').show();
        $('.userNameOK').hide();
        $('.userNameErr').hide();
        userNameFlag = false;
        return;
    }
    //console.log(name);
    $.ajax({
        type:'POST',
        url:'/user/checkUsername',
        data:{
            name:name
        },
        success:function(response){
            if(response=='the userName is taken'){
                $('.userNameTip').hide();
                $('.userNameOK').hide();
                $('.userNameErr').show();
                userNameFlag = false;
            }else if(response=='the userName is ok'){
                $('.userNameTip').hide();
                $('.userNameOK').show();
                $('.userNameErr').hide();
                userNameFlag = true;
            }
        }
    })

})
$password.blur(function(){
    var password = $password.val().trim();
    console.log(password.length)
    if(!(password.length<=16 && password.length>=6)){
        $('.passwordTips').text('密码长度请在6~16间').show();
        $('.passwordTipsOK').hide();
        passwordFlag = false;
    }else{
        $('.passwordTips').hide();
        $('.passwordTipsOK').text('可以使用该密码').show();
        passwordFlag = true;
    }

})
$rePassword.blur(function(){
    var rePassword = $rePassword.val().trim();
    var password = $password.val().trim();
    if(rePassword != password){
        $('.rePasswordTips').text('两次密码不相同').show();
        $('.rePasswordTipsOK').hide();
        rePasswordFlag = false;
    }else{
        $('.rePasswordTips').hide();
        $('.rePasswordTipsOK').text('两次密码相同').show();
        rePasswordFlag = true;
    }

})

function checkState(){

    $userName.blur();
    $password.blur();
    $rePassword.blur();
    var flag = userNameFlag && passwordFlag && rePasswordFlag;
    //if(flag){
    //    $submitBtn.removeAttr('disable');
    //}else{
    //    $submitBtn.disable = 'disable';
    //}
    return flag;
}

//实时头像显示
$(".fileToLoad").change(function(){
    //var filePath = $('.fileToLoad').val();
    //console.log(file.val()) ;
    var objUrl = getObjectURL(this.files[0]) ;

    if (objUrl) {
        $(".userimg").attr("src", objUrl) ;

    }
});
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}