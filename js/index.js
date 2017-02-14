/**
 * Created by Administrator on 2017/1/17.
 */
$(function(){
    (function (window, document) {
        impress().init();  // 初始化幻灯片的step

        var $imgs = $('img');
        var imgs = document.querySelectorAll('img');
        var imgsIndex = $imgs.length;

        function imgLoad(img, callback) {
            var timer = setInterval(function () {
                for (var i = 0; i < imgsIndex; i++) {
                    if (img[i].complete) {
                        imgsIndex--;
                        if (!imgsIndex) {
                            clearInterval(timer);
                            callback(img);
                            console.log('加载完成');
                        }
                    }
                }
            }, 100);
        }

        imgLoad(imgs, function () {
            $('#zz').css('display','none').html('');

            // 绑定button点击事件
            $('#btn-call').on('click', function () {
                $(this).animate({width:0,height:0,opacity:0,fontSize:0},100);
                setTimeout(function(){
                    $('#btn-call').css('display', 'none');
                    $('.btn-div').css('display','block').animate({opacity:1},300);
                },400);
            });

            function change() {
                $('#footer-div').css('top', document.body.clientHeight - 70);
            }
            window.onresize = function () {
                change();
            };
            change();
        });


    })(window, document);
});