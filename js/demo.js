// 数据绑定 初始化
(function () {

    var data = [
        {
            title: '轮播图',
            con: [
                {
                    name: '切割轮播图',
                    url: 'demo/carouselFigure/切割轮播图.html'
                }, {
                    name: '定位轮播图',
                    url: 'demo/carouselFigure/定位轮播图.html'
                }, {
                    name: '旋转轮播图',
                    url: 'demo/carouselFigure/旋转轮播图.html'
                }
            ]
        }, {
            title: 'AJAX',
            con: [
                {
                    name: '仿百度搜索',
                    url: 'demo/ajax/baiDuSearch.html'
                }, {
                    name: '菜品做法搜索',
                    url: 'demo/ajax/menuQuery.html'
                }, {
                    name: '未来5天天气查询',
                    url: 'demo/ajax/weatherQuery.html'
                }
            ]
        }, {
            title: 'Canvas',
            con: [
                {
                    name: '旋转动画',
                    url: 'demo/canvas/旋转动画.html'
                }, {
                    name: '序列帧动画',
                    url: 'demo/canvas/序列帧动画.html'
                }, {
                    name: '饼状图',
                    url: 'demo/canvas/饼状图.html'
                }, {
                    name: '柱状图',
                    url: 'demo/canvas/柱状图.html'
                }, {
                    name: '进度条',
                    url: 'demo/canvas/进度条.html'
                }
            ]
        }, {
            title: 'CSS3',
            con: [
                {
                    name: '手风琴效果',
                    url: 'demo/css3/css3手风琴效果.html'
                }, {
                    name: '构建立方体',
                    url: 'demo/css3/构建立方体.html'
                }, {
                    name: '翻转导航栏',
                    url: 'demo/css3/翻转导航栏.html'
                }, {
                    name: '音乐导航',
                    url: 'demo/css3/音乐导航.html'
                }
            ]
        }, {
            title: 'Javascript',
            con: [
                {
                    name: '惯性滑动',
                    url: 'demo/javascript/惯性滑动.html'
                }, {
                    name: '手风琴效果',
                    url: 'demo/javascript/手风琴效果.html'
                }, {
                    name: '拖动窗口',
                    url: 'demo/javascript/拖动窗口.html'
                }, {
                    name: '判断鼠标进入离开方向',
                    url: 'demo/javascript/判断鼠标进入离开方向.html'
                }, {
                    name: '拖拽案例',
                    url: 'demo/javascript/拖拽案例.html'
                }, {
                    name: '放大镜效果',
                    url: 'demo/javascript/放大镜效果.html'
                }, {
                    name: '时钟',
                    url: 'demo/javascript/时钟.html'
                }, {
                    name: '水平滚动条拖动',
                    url: 'demo/javascript/水平滚动条拖动.html'
                }, {
                    name: '动态滚动条',
                    url: 'demo/javascript/动态滚动条.html'
                }, {
                    name: '筋斗云效果',
                    url: 'demo/javascript/筋斗云特效.html'
                }, {
                    name: '选定文字弹出层',
                    url: 'demo/javascript/选定文字弹出层.html'
                }, {
                    name: '选择文件显示文件信息',
                    url: 'demo/javascript/选择文件显示文件信息.html'
                }, {
                    name: '微博发布',
                    url: 'demo/javascript/微博发布.html'
                }, {
                    name: '五角星评分控件',
                    url: 'demo/javascript/五角星评分控件.html'
                }, {
                    name: '仿京东跳转楼层',
                    url: 'demo/javascript/JumpFloor.html'
                }, {
                    name: '动态创建表格',
                    url: 'demo/javascript/DynamicallyCreateForm.html'
                }
            ]
        }, {
            title: 'JS小游戏',
            con: [
                {
                    name: '看色点字',
                    url: 'demo/JsGame/看色点字.html'
                }, {
                    name: '见缝插针',
                    url: 'demo/JsGame/见缝插针.html'
                }, {
                    name: '贪吃蛇',
                    url: 'demo/JsGame/贪吃蛇.html'
                }
            ]
        }
    ];

    // 初始化iframe高度宽度
    var iframe = document.querySelector('#iframe');
    iframe.style.width = iframe.offsetWidth - 201 + 'px';
    iframe.style.height = iframe.offsetHeight - 80 + 'px';

    // 数据绑定
    var ul = document.querySelector('#ul');
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += '<li class="title">';
        str += '<h4>' + data[i].title + '</h4>';
        str += '<ul data-url="1" class="ul-bindEvent">';
        for (var j = 0; j < data[i].con.length; j++) {
            str += '<li data-url="' + data[i].con[j].url + '">' + data[i].con[j].name + '</li>';
        }
        str += '</ul>';
        str += '</li>';
    }

    ul.innerHTML = str;


    // 绑定li点击事件
    var bindEvent = document.querySelectorAll('.ul-bindEvent');
    for (var i = 0; i < bindEvent.length; i++) {
        var bind = bindEvent[i].children;
        for (var j = 0; j < bind.length; j++) {
            bind[j].addEventListener('click', function () {
                iframe.setAttribute('src', this.dataset.url);
            })
        }
    }


})();

// 左侧tab栏动画
(function () {
    var tem = -1, flag = false;
    var h = document.querySelectorAll('.title > h4');
    var ul = document.querySelectorAll('.title > ul');
    for (var i = 0; i < h.length; i++) {
        h[i].index = i;
        h[i].addEventListener('click', function () {
            for (var i = 0; i < h.length; i++) {
                ul[i].className = '';
            }
            if (tem == this.index && flag) {
                ul[this.index].className = '';
                flag = false;
            } else {
                ul[this.index].className = 'show';
                flag = true;
            }
            tem = this.index;
        });
    }
})();

