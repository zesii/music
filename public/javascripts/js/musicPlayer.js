/**
 * Created by zes on 2017/7/17.
 */
//function $(s){
//    return document.querySelectorAll(s);
//}
var size = 64;
//var list = $('#list li');
var table = $('.songlist table')

var mv = new MusicVisulizer({
    size:size,
    visualizer:draw

})

table[0].onclick=function(e){
    var target = e.target;
    if(target.nodeName.toLocaleLowerCase()=='span'){

        //样式部分
        var playNode = $('.playContro');
        for(var i=0;i<playNode.length;i++){
            playNode[i].classList.remove('play');
            playNode[i].classList.add('stop');
        }
        if(target.classList.contains('stop')){
            target.classList.remove('stop');
            target.classList.add('play')
        }

        //功能部分
        var albumId = $('.albumId')[0].value;
        //alert(albumId);
        var song = target.parentNode.parentNode.childNodes[1].innerText;
        var artist = target.parentNode.parentNode.childNodes[0].innerText;
        var time = target.parentNode.parentNode.childNodes[2].childNodes[0].innerText;

        //获得要播放的歌曲
        var mp3 = time+' - '+artist+' - '+song+'.mp3';
        var mediaURL = '/media/album'+albumId+'/'+mp3;

        //获得要显示时间的部分
        var timeBar = $('.timerShaftMove');
        var timeBarBack = $('.timerShaft');
        var timeFrame = $('.time');
        //console.log(song);

        var lyrUrl = '/lyrics/'+song+'.txt';
        var lyrFrame = $('.lyric ul')
        //播放歌曲
        //console.log(mv.getCurrentTime());
        mv.play(mediaURL,timeBarBack,timeBar,timeFrame,lyrUrl,lyrFrame);
        //$('.lyric ul').css({
        //    top:'0px'
        //})

    }
}



//canvas部分
var box = $('.visual')[0];
var height,width;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
box.appendChild(canvas);

var Dots=[];
function random(m,n){
    return Math.round(Math.random()*(n-m)+m);
}
function getDots(){
    Dots = [];
    for(var i=0;i<size;i++){
        var x = random(0,width);
        var y = random(0,height);
        var color = "rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+",.4"+")";
        Dots.push({
            x:x,
            y:y,
            dx:random(0,2),
            color:color
        })
    }
}
function resize(){

    height = box.clientHeight;
    width = box.clientWidth;
    //console.log(height,width);
    canvas.height = height;
    canvas.width = width;
    var line = ctx.createLinearGradient(0,0,0,height);
    line.addColorStop(0,'lightpink');
    line.addColorStop(0.5,'pink');
    line.addColorStop(1,'red');
    ctx.fillStyle = line;
    getDots();
}

resize();

window.onresize = resize;



//条形图
function draw(arr){
    ctx.clearRect(0,0,width,height);
    var w = width/size;
    for(var i=0;i<size;i++){
        var h = arr[i]/256 *height;
        ctx.fillRect(w*i,height-h,w*0.6,h);
    }
}

//圆点图
//function draw(arr){
//    ctx.clearRect(0,0,width,height);
//    for(var i=0;i<size;i++){
//        ctx.beginPath();
//        //var r = arr[i] / 256 * 40;
//        var r = 2+arr[i]/255 *(height>width?width:height)/15;
//        var o = Dots[i];
//        //console.log(arr[i]);
//        ctx.arc(o.x, o.y,r,0,Math.PI*2,true);
//        var g = ctx.createRadialGradient(o.x, o.y,0, o.x, o.y ,r);
//        g.addColorStop(0,"#fff");
//        g.addColorStop(1, o.color);
//        ctx.fillStyle = g;
//        ctx.fill();
//        o.x +=  o.dx;
//        o.x = o.x>width?0: o.x;
//
//        //ctx.strokeStyle = '#fff';
//        //ctx.stroke();
//    }
//}




//音量调节
//$('.volume').click(function(){
//    $('.volumeRange').toggleClass('hide');
//
//})
//$('.volumeRange').change(function(){
//
//    //console.log(this.value);
//    mv.changeVolume(this.value/this.max);
//})
//$('.volumeRange')[0].onchange();


//更多操作部分
$('.more').click(function(){
    $('.moreHide').toggleClass('hide');
})
$('.loop').click(function(){
    $(this).addClass('select');
})
//歌词显示---海报显示
$('.words').click(function(){
    var $lyrPic = $('.lyrPic');
    if($(this).hasClass('select')){
        $(this).removeClass('select');
        $lyrPic.hide();
    }else{
        $(this).addClass('select');
        $lyrPic.show();
    }
})
//上一首
$('.previous').click(function(){

})