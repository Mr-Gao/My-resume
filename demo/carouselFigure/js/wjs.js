/**
 * Created by Administrator on 2016/10/15.
 */

window.onload = function (){
    //获取元素
    function $(id){return document.getElementById(id);}
    var js_slider = $("js_slider");
    var sliderCtrl = $("js-slider-ctrl");
    var sliderMain = $("js-slider-main");
    var imgs = sliderMain.children;

    for(var i=0;i<imgs.length;i++){
        var span = document.createElement("span");
        sliderCtrl.insertBefore(span,sliderCtrl.children[1]);
        span.className = "slider-ctrl-con";
        span.innerHTML = imgs.length - i;
    }
    var spans = sliderCtrl.children;
    spans[1].className = "slider-ctrl-con current";

    var scrollWidth = sliderCtrl.offsetWidth;
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.left = scrollWidth + "px";
    }

    var key = 0;
    for(var k in spans){
        spans[k].onclick = function(){
            if(this.className == "slider-ctrl-prev"){
                animate(imgs[key],{left: scrollWidth});
                --key < 0 ? key = imgs.length -1 : key;
                imgs[key].style.left = -scrollWidth + "px";
                animate(imgs[key],{left: 0});
                setSquare();
            }else if(this.className == "slider-ctrl-next"){
                autoPlay();
            }else{
                var that = this.innerHTML - 1;
                if(that > key){
                    animate(imgs[key],{left: -scrollWidth});
                    imgs[that].style.left = scrollWidth + "px";

                }else if(that < key){
                    animate(imgs[key],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
                }
                key = that;
                animate(imgs[key],{left: 0});
                setSquare();
            }
        }
    }

    var timer = null;
    timer = setInterval(autoPlay,2000);

    js_slider.onmouseover = function(){
        clearInterval(timer);
    }
    js_slider.onmouseout = function(){
        clearInterval(timer);
        timer = setInterval(autoPlay,2000);
    }

    function autoPlay(){
        animate(imgs[key],{left: -scrollWidth});
        ++key > imgs.length - 1 ? key = 0 : key;
        imgs[key].style.left = scrollWidth + "px";
        animate(imgs[key],{left: 0});
        setSquare();
    }

    function setSquare(){
        for(var i=1;i<spans.length-1;i++){
            spans[i].className = "slider-ctrl-con";
        }
        spans[key+1].className = "slider-ctrl-con current";
    }
}