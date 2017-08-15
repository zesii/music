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
    var albumId = $('.storyForm .albumId').val();
    //console.log($user);
    $.ajax({
        url:'/musicStory/new',
        type:'post',
        data:{
            content:$comment,
            user:$user,
            albumId:albumId
        },
        success:function(response){

            if(response.indexOf('save')>=-1){

                var musicStoryId = response.split('save')[1].trim();
                console.log(musicStoryId);
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
                var starWrapper = document.createElement('span');
                var storyStars = document.createElement('span');
                var starNum = document.createElement('span');
                starWrapper.classList.add('starWrapper');
                storyStars.classList.add('storyStars');
                storyStars.classList.add('disagree');
                storyStars.addEventListener('click',function(e){starComment(e,musicStoryId);},false);
                starNum.classList.add('starNum');
                starNum.innerText = '0';
                starWrapper.appendChild(storyStars);
                starWrapper.appendChild(starNum);

                divWrapper.appendChild(divUserPic);
                divUserPic.appendChild(userImg);
                divWrapper.appendChild(divStory);
                divWrapper.appendChild(starWrapper);
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
    var albumId = $('.smell .albumId').val();
    $.ajax({
        url:'/musicSmell/new',
        type:'post',
        data:{
            smell:smell,
            user:user,
            albumId:albumId
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