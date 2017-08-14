/**
 * Created by zes on 2017/7/19.
 */
function MusicVisulizer(obj){
    this.source = null;//��ǰ���ڲ��ŵ�bufferSource�ڵ�

    this.count = 0;//�������

    this.analyser = MusicVisulizer.ac.createAnalyser();//�����ڵ�

    this.size = obj.size;
    this.analyser.fftSize = this.size*2;

    this.gainNode = MusicVisulizer.ac[MusicVisulizer.ac.createGain?"createGain":"createGainNode"]();//������������

    this.analyser.connect(this.gainNode);
    this.gainNode.connect(MusicVisulizer.ac.destination);

    this.xhr = new XMLHttpRequest();

    this.visualizer = obj.visualizer;
    this.visualize();
}

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
MusicVisulizer.prototype.decode = function(arraybuffer,cb){
    MusicVisulizer.ac.decodeAudioData(arraybuffer,function(buffer){
        cb(buffer);
    },function(err){
        console.log(err);
    });
}

MusicVisulizer.prototype.play = function(url){
    var n = ++this.count;
    var self = this;
    this.source && this.stop();
    this.load(url,function(arraybuffer){
        if(n != self.count) return;
        self.decode(arraybuffer,function(buffer){
            if(n!= self.count) return;
            var bs = MusicVisulizer.ac.createBufferSource();
            bs.connect(self.analyser);
            bs.buffer = buffer;
            bs[bs.start?"start":"noteOn"](0);
            self.source = bs;
        })
    });

}
MusicVisulizer.prototype.stop = function(){
    this.source[this.source.stop?"stop":"nodeOff"](0);
}
MusicVisulizer.prototype.changeVolume = function(percent){
    this.gainNode.gain.value = percent*percent;
}


//���ӻ�
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