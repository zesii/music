/**
 * Created by zes on 2017/7/19.
 */
function MusicVisulizer(obj){
    this.options = obj.options;
    this.source = null;//当前正在播放的bufferSource节点

    this.count = 0;//点击次数

    this.analyser = MusicVisulizer.ac.createAnalyser();//分析节点

    this.size = obj.size;
    this.analyser.fftSize = this.size*2;

    this.gainNode = MusicVisulizer.ac[MusicVisulizer.ac.createGain?"createGain":"createGainNode"]();//控制音量部分

    this.analyser.connect(this.gainNode);
    this.gainNode.connect(MusicVisulizer.ac.destination);

    this.xhr = new XMLHttpRequest();

    this.visualizer = obj.visualizer;
    this.visualize();

    this.duration = 0;//时间长度

    this.lyr = null;
    this.offset = 0;


    this.onplayIndex = -1;
}
var line = 0;
MusicVisulizer.ac = new (window.AudioContext || window.webkitAudioContext)();


MusicVisulizer.prototype.load = function(url,cb){
    var self = this;
    this.xhr.abort();
    this.xhr.open("GET",url);
    this.xhr.responseType = "arraybuffer";


    this.xhr.onload = function(){
        cb(self.xhr.response);
    }
    this.xhr.send();
}
MusicVisulizer.prototype.loadLyr = function(url,cb){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload = function(){
        cb(xhr.response);
    }
    xhr.send();
}
MusicVisulizer.prototype.decode = function(arraybuffer,cb){
    MusicVisulizer.ac.decodeAudioData(arraybuffer,function(buffer){
        cb(buffer);
    },function(err){
        console.log(err);
    });
}
MusicVisulizer.prototype.getMusicIndex = function(musicUrl){
    console.log(musicUrl);
    var playList = this.options.playList;
    var index=-1;
    var listLength = playList.length;
    for(var i=0;i<listLength;i++){
        if(musicUrl===playList[i].mediaURL){
            index = i;
        }
    }
    return index;
}
MusicVisulizer.prototype.playNext = function(index){
    var playList = this.options.playList;
    var listLength = playList.length;

    var nextIndex = index+1;
    if(nextIndex<listLength){
        var nextMediaUrl = playList[nextIndex].mediaURL;
        var nextLyrUrl = playList[nextIndex].lyrUrl;
        this.play(nextMediaUrl,nextLyrUrl);

    }else{

    }

    //播放图标更新
    var listFrame = this.options.listFrame;
    var list = listFrame.children();
    //console.log(list[index])
    var playClass = list[index+1].childNodes[2].childNodes[1].classList;
    console.log(playClass);
    playClass.remove('play')
    playClass.add('stop')
    var nextPlay = list[index+2].childNodes[2].childNodes[1].classList;
    nextPlay.remove('stop')
    nextPlay.add('play')


}

MusicVisulizer.prototype.play = function(url,lyrUrl){
    var timeBarBack = this.options.timeBarBack;
    var timeBar = this.options.timeBar;
    var timeFrame = this.options.timeFrame;
    var lyricFrame = this.options.lyrFrame;

    var timer;
    var n = ++this.count;
    var self = this;
    this.source && this.stop();
    this.load(url,function(arraybuffer){
        if(n != self.count) {
            clearInterval(timer);
            return;
        }
        self.decode(arraybuffer,function(buffer){
            if(n!= self.count) {
                clearInterval(timer);
                return;
            }
            self.duration = buffer.duration;
            var bs = MusicVisulizer.ac.createBufferSource();
            bs.connect(self.analyser);
            bs.buffer = buffer;
            self.loadLyr(lyrUrl,function(lyr){//把歌词加载在页面上
                clearInterval(timer);
                $('.lyric ul').css({
                    top:'0px'
                })
                line = 0;
                self.lyr = lyr;
                self.lyricShow(self.lyr,lyricFrame);
                //console.log(lyr);
                bs[bs.start?"start":"noteOn"](0);
                self.offset = self.getCurrentTime();
                self.source = bs;
                timer = setInterval(function(){
                    if(self.offset != undefined){
                        self.timerShaft(timeBarBack,timeBar,timeFrame,self.offset);
                        self.lyricMove(self.lyr,lyricFrame,self.offset);
                    }

                },100)

                self.source.onended = function(){
                    clearInterval(timer);
                    var playIndex = self.getMusicIndex(url);
                    self.playNext(playIndex)
                    //mv.play(nextUrl,nextLyrUrl)
                }//设置结束事件


            })

            //bs[bs.start?"start":"noteOn"](0);
            //self.offset = self.getCurrentTime();
            //self.source = bs;
            //timer = setInterval(function(){
            //    if(self.offset != undefined){
            //        self.timerShaft(timeBarBack,timeBar,timeFrame,self.offset);
            //        self.lyricMove(self.lyr,lyricFrame,self.offset);
            //    }
            //
            //},500)
            //
            //self.source.onended = function(){
            //    clearInterval(timer);
            //}//设置结束事件



        })
    });


}
function prepareLyr(lyr) {
    if(lyr==""){
        return "";
    }
    var lyrArr = lyr.split('\n');
    var lyrics = [];
    for (var i = 0; i < lyrArr.length; i++) {
        var time = lyrArr[i].split(']')[0].substring(1);
        var min = parseInt(time.split(":")[0]);
        var second = parseFloat(time.split(":")[1]);
        var lineTime = min * 60 + second;
        var line = lyrArr[i].split(']')[1];
        lyrics.push({
            time: lineTime,
            line: line
        })
    }
    return lyrics
}
function lyrDisplay(lyrics,showElem){//默认showElem为已经存在的ul
    if(lyrics==""){
        showElem.html("<li>无法加载歌词</li>");
        return;
    }
    var len = lyrics.length;
    var content = "";
    for(var i=0;i<len;i++){
        content+='<li>'+lyrics[i].line+"</li>"
    }
    showElem.html(content);
    //return lyrics;
}

MusicVisulizer.prototype.lyricShow = function(lyr,lyricFrame){
    if(lyr.indexOf('[')==-1){
        lyr = "";
    }
    var lyrArr = prepareLyr(lyr);
    lyrDisplay(lyrArr,lyricFrame)

}


var parsed;
MusicVisulizer.prototype.lyricMove=function(lyr,lyricFrame,timeoffset){
    var lyrNode  = $('.lyric ul li');
    var lyrWrapper = $('.lyric ul');
    var _self = this;



    var lyrArr = prepareLyr(lyr);
    var len = lyrArr.length;
    var currentTime = _self.getCurrentTime()-timeoffset;
    if(line<len-1){
        var lineTime = lyrArr[line].time;
        var nextLineTime = lyrArr[line+1].time;
        parsed = lineTime;

        if(currentTime<parsed){
            return;
        }
        if(currentTime>=lineTime && currentTime<=nextLineTime){
            if(line==0){
                lyrNode[line].classList.add('on');
            }else{
                if(line>=6 && line<=len-5){
                    var topValue = $(lyrNode[line]).outerHeight(true);
                    //var topValue = 30;
                    if(!lyrWrapper.is(':animated')){
                        lyrWrapper.stop().animate({top:'-='+topValue+"px"});
                    }
                }
                lyrNode[line].classList.add('on');
                lyrNode[line-1].classList.remove('on');
            }
            parsed = nextLineTime;
            line++;
        }
    }

    if(currentTime>=lyrArr[len-1].time){
        //console.log("in")
        //console.log(lyrNode[len-1])
        //console.log(lyrNode[len-2])
        lyrNode[len-1].classList.add('on');
        lyrNode[len-2].classList.remove('on');
    }



}







MusicVisulizer.prototype.stop = function(){
    this.source[this.source.stop?"stop":"nodeOff"](0);

}
MusicVisulizer.prototype.changeVolume = function(percent){
    this.gainNode.gain.value = percent*percent;
}



//可视化
MusicVisulizer.prototype.visualize = function(){
    var arr = new Uint8Array(this.analyser.frequencyBinCount);
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    var self = this;
    function v(){
        self.analyser.getByteFrequencyData(arr);
        self.visualizer(arr);
        requestAnimationFrame(v);
    }
    requestAnimationFrame(v);
}


//有关音乐的时间和一些播放操作
MusicVisulizer.prototype.getCurrentTime=function(){
    return MusicVisulizer.ac.currentTime;
}

MusicVisulizer.prototype.getTotalTime = function(){
    return this.duration;
}



MusicVisulizer.prototype.timerShaft= function(timeBarBack,timeBar,timeFrame,timeoffset){
    //三个参数分别是时间轴背景元素（需要获得长度）时间轴元素 显示播放时间的元素
    var currentTime = this.getCurrentTime()-timeoffset;

    var totalTime = this.getTotalTime();
    var totalMin = parseInt(totalTime/60);
    var totalSec = parseInt(totalTime%60);
    if((''+totalMin).length<2){
        totalMin = '0'+totalMin;
    }
    if((''+totalSec).length<2){
        totalSec = '0'+totalSec;
    }
    var timebarLength = timeBarBack.css('width').split("px")[0];
    var currentMin = parseInt(currentTime/60);
    if((''+currentMin).length<2){
        currentMin = '0'+currentMin;
    }
    var currentSec = parseInt(currentTime%60);

    var currentWidth = currentTime/totalTime*timebarLength;

    if((''+currentSec).length<2){
        currentSec = '0'+currentSec;
    }
    //console.log(timebarLength)
    if(currentTime<totalTime){
        $(timeBar).css({
            width:currentWidth+'px'
        })
        $(timeFrame).text(totalMin+":"+totalSec+'/'+currentMin+':'+currentSec);
    }

}


