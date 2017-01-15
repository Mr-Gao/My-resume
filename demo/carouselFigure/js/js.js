/**
 * Created by Administrator on 2016/10/18.
 */
window.onload = function(){
    function $(id){return document.getElementById(id);}
    var wrap = $("wrap");
    var slide = $("slide");
    var arrow = $("arrow");
    var lis = slide.getElementsByTagName("li");

    wrap.onmouseover = function(){
        animate(arrow,{opacity: 100});
    }
    wrap.onmouseout = function(){
        animate(arrow,{opacity: 0});
    }

    //  存储了每个图片的信息
    var json = [
        {   //  1
            width:400,
            top:20,
            left:50,
            opacity:20,
            z:2
        },
        {  // 2
            width:600,
            top:70,
            left:0,
            opacity:80,
            z:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            z:4
        },
        {  // 4
            width:600,
            top:70,
            left:600,
            opacity:80,
            z:3
        },
        {   //5
            width:400,
            top:20,
            left:750,
            opacity:20,
            z:2
        }
    ];

    change();
    var jl = true;
    var as = arrow.children;
    for(var k in as){
        as[k].onclick = function(){
            if(this.className == "prev"){
                if(jl){
                    change(false);
                    jl = false;
                }
            }else{
                if(jl){
                    change(true);
                    jl = false;
                }
            }
        }
    }

    function change(flag){
        if(flag){
            json.unshift(json.pop());
        }else{
            json.push(json.shift());
        }
        for(var i=0; i<json.length; i++){
            animate(lis[i],{
                width: json[i].width,
                top: json[i].top,
                left: json[i].left,
                opacity: json[i].opacity,
                zIndex: json[i].z
            },function(){jl=true;})
        }
    }



}