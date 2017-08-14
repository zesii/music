/**
 * Created by zes on 2017/8/6.
 */

$('.storySubmit').click(function(){
    var $comment = $('.content').val().trim();
    if($comment==""){
        $('.commentTips').show();
    }else{
        $('.commentTips').hide();
    }
    var $user = $('.from').val();
    console.log($user);
    $.ajax({
        url:'/musicStory/new',
        type:'post',
        data:{
            content:$comment,
            user:$user,
        },
        success:function(response){

            if(response=='save'){
                alert("评论成功");

                var userName =  $('.userName').text().split('欢迎您,')[1];
                var divWrapper = document.createElement('div');
                divWrapper.classList.add('userStory');
                var divUserPic = document.createElement('div');
                divUserPic.classList.add('userPic');
                var userImg = document.createElement('img');
                userImg.src = "images/user/user2.jpg";
                var divStory = document.createElement('div');
                divStory.classList.add('storyContent');
                divStory.innerText=userName+':'+$comment;
                divWrapper.appendChild(divUserPic);
                divUserPic.appendChild(userImg);
                divWrapper.appendChild(divStory);
                $('.story').append(divWrapper);
                $('.content').val("");
                $('.storySubmit').attr('disabled',false)
            }else{
                alert("出问题啦，请稍后重试")
            }
        }
    })

})

$('.smellSubmit').click(function(){
    var smell = $('.smellInput').val().trim();
    if(smell==""){
        $('.smellTips').show();
    }else{
        $('.smellTips').hide();
    }
    var user = $('.from').val();

    $.ajax({
        url:'/musicSmell/new',
        type:'post',
        data:{
            smell:smell,
            user:user,
        },
        success:function(response){

            if(response=='save'){
                alert('添加成功');
                tc.add($('<span>'+smell+'</span>'));
                $('.smellInput').val("")
            }else{
                alert("出问题啦，请稍后重试")
            }
        }
    })
})