/**
 * Created by zes on 2017/7/22.
 */
//alert("hello");


(function($){
    var Slider = function(el,userConfig){
        var _this = this;
        this.el = el;
        this.userConfig = userConfig;
        this.config = {
            w:this.el.width(),
            current:0,
            speed:500,
            intervalTime:4000
        }
        if(userConfig!=null){
            $.extend(this.config,this.userConfig);
        }

        //查找有关图片轮播的元素
        var adsframe = this.el;
        var ul = adsframe.children('ul');
        var li = ul.children('li');
        var adsBack = $('.ads_back');

        //初始化左右按钮
        this.el.append('<a href="#" class="slider-btn slider-btn-left">&lt;</a>');
        this.el.append('<a href="#" class="slider-btn slider-btn-right">&gt;</a>');

        var slider_btn_left = this.el.children('.slider-btn-left');
        var slider_btn_right = this.el.children('.slider-btn-right');

        // 初始化圆点
        this.el.append('<div class="slider-dot"><ul></ul></div>')
        var slider_dot = this.el.children('.slider-dot');
        var slider_dot_ul = slider_dot.children('ul');
        var liLength = li.length;
        for (var i = 0; i < liLength; i++) {
            if(i === this.config.current){
                slider_dot_ul.append('<li class="active"></li>')
            } else {
                slider_dot_ul.append('<li></li>')
            }
        }
        var slider_dot_ul_li = slider_dot_ul.children('li');

        // 圆点切换点亮
        var active = function(i) {
            slider_dot_ul_li.removeClass('active');
            slider_dot_ul_li.eq(i).addClass('active');
            changeBackgroundColor(i);
        }

        // 右点击事件
        slider_btn_right.on('click', function(event) {
            //console.log(liLength);
            event.preventDefault();
            //console.log("this.current: "+_this.config.current);
            if(_this.config.current < liLength){//不是最后一个
                toggleInterval ()

                _this.config.current ++;
                if(_this.config.current != liLength) {
                    ul.stop(true, false).animate({left: - _this.config.w * _this.config.current}, _this.config.speed, function () {
                        active(_this.config.current)
                    })
                }
                if (_this.config.current === liLength) {
                    ul.stop(true, false).animate({}, _this.config.speed, function() {
                        //ul.css('left', 0)//- _this.config.w)
                        ul.animate({left:0},_this.config.speed);
                        _this.config.current = 0;
                        //console.log("last")
                        active(_this.config.current)
                    })
                }

            }
        })

         //左点击事件
        slider_btn_left.on('click', function(event) {
            //console.log(_this.config.current);
            event.preventDefault()
            if(_this.config.current >= 0){
                toggleInterval ()
                _this.config.current --;
                if(_this.config.current != -1){
                    ul.stop(true, false).animate({left: - _this.config.w * _this.config.current}, _this.config.speed, function() {
                        active(_this.config.current)
                    })
                }
                if(_this.config.current === -1){
                    ul.stop(true, false).animate({left: 0}, _this.config.speed, function() {
                        ul.animate({'left': - _this.config.w * (liLength - 1)},_this.config.speed);
                        //_this.config.current = ul - 3
                        _this.config.current=3;
                        active(_this.config.current)
                    })
                }

            }
        })
        slider_dot_ul_li.on('click', function(event) {
            event.preventDefault()
            toggleInterval ()
            var index = $(this).index();
            //console.log(index);
            active(index)
            ul.stop(true, false).animate({left: - _this.config.w * index}, _this.config.speed, function() {
                _this.config.current = index
            })
        })

        // 自动切换
        var sliderInt = setInterval(sliderInterval, _this.config.intervalTime)
        // 判断图片切换
        function sliderInterval() {
            if (_this.config.current <= liLength) {
                _this.config.current ++;
                //console.log(_this.config.current);
                if(_this.config.current!=liLength){
                    ul.stop(true, false).animate({left: - _this.config.w * _this.config.current }, _this.config.speed, function() {
                        active(_this.config.current);

                    })
                }
                if(_this.config.current === liLength) {
                        ul.stop(true, false).animate({}, _this.config.speed, function() {
                            ul.animate({'left': 0});
                            _this.config.current = 0;
                            active(_this.config.current);
                        })
                    }

            }
        }
        // 重置计时器
        function toggleInterval () {
            clearInterval(sliderInt)
            sliderInt = setInterval(sliderInterval, _this.config.intervalTime)
        }
        function changeBackgroundColor(index){
            var colors = ['#790007','#FCCB79','#000000','#47625A'];
            adsBack.css({
                //backgroundImage:'linear-gradient(green 50%,transparent 0)',
                //backgroundSize:'50px',
                backgroundColor:colors[index]
            })
        }


    }

    $.fn.extend({
        Slider:function(){
            new Slider($(this))
        }
    })
})(jQuery);
//console.log($('.artists'));
$('.adsframe').Slider();