/**
 * Created by zes on 2017/7/17.
 */
function $(s){
    return document.querySelectorAll(s);
}
var size = 32;
var list = $('#list li');
var mv = new MusicVisulizer({
    size:size,
    visualizer:draw

})

for(var i=0;i<list.length;i++){
    list[i].onclick = function(){
        for(var j=0;j<list.length;j++){
            list[j].className="";
        }
        this.className="selected";
        //load("/media/"+this.title);
        mv.play("/media/"+this.title);
    }
}
//var xhr = new XMLHttpRequest();
//var ac = new (window.AudioContext || window.webkitAudioContext)();
//var gainNode = ac[ac.createGain?"createGain":"createGainNode"]();//控制音量部分
//gainNode.connect(ac.destination);
//
//var analyser = ac.createAnalyser();

//analyser.fftSize = size*2;
//analyser.connect(gainNode);
//var source = null;
//var count = 0;
//canvas部分
var box = $('#box')[0];
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
    line.addColorStop(0,'red');
    line.addColorStop(0.5,'yellow');
    line.addColorStop(1,'green');
    ctx.fillStyle = line;
    getDots();
}

resize();
window.onresize = resize;

//
function draw(arr){
    ctx.clearRect(0,0,width,height);
    var w = width/size;
    for(var i=0;i<size;i++){
        var h = arr[i]/256 *height;
        ctx.fillRect(w*i,height-h,w*0.6,h);
    }
}

//function draw(arr){
//    ctx.clearRect(0,0,width,height);
//    for(var i=0;i<size;i++){
//        ctx.beginPath();
//        //var r = arr[i] / 256 * 40;
//        var r = 3+arr[i]/255 *(height>width?width:height)/10;
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


//function load(url){
//
//    var n = ++count;
//    source && source[source.stop?"stop":"noteOff"]();
//    xhr.abort();
//    xhr.open('GET',url);
//    xhr.responseType = "arraybuffer";//b这里是小写，哭，，找了半天
//    xhr.onload = function(){
//        if(n != count) return;
//        ac.decodeAudioData(xhr.response,function(buffer){
//            if(n != count) return;
//            var bufferSource = ac.createBufferSource();
//            bufferSource.buffer = buffer;
//            bufferSource.connect(analyser);
//            //bufferSource.connect(gainNode);
//            //bufferSource.connect(ac.destination);
//            bufferSource[bufferSource.start?"start":"noteOn"](0);
//            source = bufferSource;
//            //visualizer();
//        },function(err){
//            console.log(err);
//        })
//    }
//    xhr.send();
//}
//function visualizer(){
//    var arr = new Uint8Array(analyser.frequencyBinCount);
//    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
//    function v(){
//        analyser.getByteFrequencyData(arr);
//        draw(arr);
//        requestAnimationFrame(v);
//    }
//    requestAnimationFrame(v);
//
//}
//visualizer();
//function changeVolume(percent){
//    gainNode.gain.value = percent*percent;
//}
$('#volume')[0].onchange = function(){
    mv.changeVolume(this.value/this.max);
}
$('#volume')[0].onchange();