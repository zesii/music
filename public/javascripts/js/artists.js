/**
 * Created by zes on 2017/7/28.
 */
$('.loveSubmit').click(function(){
    var artistId = $(this).parent().parent().parent().children('input').val()
    var $loveNum = $(this).siblings();
    var $loveIcon = $(this).children('span')
    var className = $loveIcon.attr('class');//noLove≤ªœ≤ª∂ loveœ≤ª∂
    var type =(className=='love'?-1:1);
    var newNum;
    if(type==-1){
        $loveIcon[0].classList.add('noLove');
        $loveIcon[0].classList.remove('love');
    }else{
        $loveIcon[0].classList.add('love');
        $loveIcon[0].classList.remove('noLove');
    }
    console.log(type)
    $.ajax({
        type:'POST',
        url:'/artists/love',
        data:{
            id:artistId,
            type:type
        },
        success:function(response){
            if(response=='redirect'){
                window.location='/signin';
            }
            if(response=='-1'){
                newNum = Number($loveNum.text())-1;
                $loveNum.text(newNum);
            }else if(response=='1'){
                newNum = Number($loveNum.text())+1;
                $loveNum.text(newNum);
            }
        }
    })
})