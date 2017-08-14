/**
 * Created by zes on 2017/7/26.
 */
function TagCloud(el){

    this.el = el;
    this.tags = $(el).children('span');
    this.Height = $(this.el).height();//250
    this.Width = $(this.el).width();//650
    //console.log(this.tags);
}
TagCloud.prototype.add = function(tag){
    var position = this.getPosition();
    var x = position.x;
    var y = position.y;
    var color = this.getcolor();
    tag.css({
            top:y,
            left:x,
            backgroundColor:color.backgroundColor,
            color:color.fontColor
        })
    this.el.append(tag);
}

TagCloud.prototype.getcolor = function(){
    var red = parseInt((Math.random()*100));
    var green = parseInt((Math.random()*255));
    var blue = parseInt((Math.random()*255));
    var redn = 255-red;
    return {
        fontColor:'rgb('+red+','+red+','+red+')',
        backgroundColor:'rgb('+redn+','+redn+','+redn+')'
    }
}
TagCloud.prototype.getPosition = function(el){
    var elheight = $(el).outerHeight(true);
    var elwidth = $(el).outerWidth(true);
    var divHeight = this.Height-50;
    var divWidth = this.Width-50;
    //console.log(divWidth)
    //console.log(elheight,elwidth,divHeight,divWidth);
    var x = Math.random()*divWidth;
    var y = Math.random()*divHeight;
    //console.log(x,y)
    while(x+elwidth>divWidth){
        x = Math.random()*divHeight
    }
    while(y+elheight>divHeight){
        y = Math.random()*divWidth;
    }
    //console.log(x,y)
    return {
        x:x,
        y:y
    }
}
TagCloud.prototype.showTag = function(){
    var tags = this.tags;
    var len = tags.length;
    for(var i=0;i<len;i++){
        var color = this.getcolor();
        //console.log(color)
        var position = this.getPosition(tags[i]);
        var top = position.y;
        var left = position.x;
        $(tags[i]).css({
            top:top,
            left:left,
            backgroundColor:color.backgroundColor,
            color:color.fontColor
        })
    }
}


var smell = $('.allSmell');
tc = new TagCloud(smell);
tc.showTag();