/**
 * Created by zes on 2017/8/14.
 */
function starComment(e,id){
    //alert("尝试让别人给你点赞吧 :)")
    var clickNode = e.target;
    //console.log(e.target);
    //var target =$(clickNode).parent().parent();
    var musicStoryId =id;// target.children('.musicStoryId').val();
    console.log(id);
    //var artistId = $(this).parent().parent().parent().children('input').val()
    var $starNum = $(clickNode).siblings();
    var $starIcon = $(clickNode);
    var className = $starIcon[0].classList;//noLove不喜欢 love喜欢

    var type =(className.contains('disagree')?-1:1);
    var newNum;
    if(type==-1){
        $starIcon[0].classList.add('agree');
        $starIcon[0].classList.remove('disagree');
    }else{
        $starIcon[0].classList.add('disagree');
        $starIcon[0].classList.remove('agree');
    }
    //console.log(musicStoryId);
    $.ajax({
        type:'POST',
        url:'/musicStory/love',
        data:{
            id:musicStoryId,
            type:type
        },

        success:function(response){
            //if(response=='redirect'){
            //    window.location='/signin';
            //}
            if(response=='-1'){
                newNum = Number($starNum.text())+1;
                $starNum.text(newNum);
            }else if(response=='1'){
                newNum = Number($starNum.text())-1;
                $starNum.text(newNum);
            }
        }
    })
}
$('.storyStars').click(function(){
    var target = $(this).parent().parent();
    var musicStoryId = target.children('.musicStoryId').val();

    //var artistId = $(this).parent().parent().parent().children('input').val()
    var $starNum = $(this).siblings();
    var $starIcon = $(this);
    var className = $starIcon[0].classList;//noLove不喜欢 love喜欢

    var type =(className.contains('disagree')?-1:1);
    var newNum;
    if(type==-1){
        $starIcon[0].classList.add('agree');
        $starIcon[0].classList.remove('disagree');
    }else{
        $starIcon[0].classList.add('disagree');
        $starIcon[0].classList.remove('agree');
    }
    console.log(type)
    $.ajax({
        type:'POST',
        url:'/musicStory/love',
        data:{
            id:musicStoryId,
            type:type
        },
        success:function(response){
            //if(response=='redirect'){
            //    window.location='/signin';
            //}
            if(response=='-1'){
                newNum = Number($starNum.text())+1;
                $starNum.text(newNum);
            }else if(response=='1'){
                newNum = Number($starNum.text())-1;
                $starNum.text(newNum);
            }
        }
    })
})