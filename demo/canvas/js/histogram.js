/**
 * Created by Administrator on 2016/12/11.
 */
function Histogram(option) {
    this._init(option);
}
Histogram.prototype = {
    _init: function (option) {
        // 原点坐标
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 总宽高
        this.w = option.w || 0;
        this.h = option.h || 0;
        // 数据
        this.data = option.data || '';

        //矩形组
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });

        // 总宽高
        var width = this.w;
        // 总宽高
        var height = this.h;
        // 每一份的宽度
        var eWidth = width / this.data.length;


        // 绘制底线
        var baseLine = new Konva.Line({
            points: [0, 0, width, 0],
            stroke: 'green',
            strokeWidth: 1
        });
        this.group.add(baseLine);

        var that = this;


        this.data.forEach(function(item,i){
            var rect = new Konva.Rect({
                x: (1 / 4 + i) * eWidth,
                y: -item.value * height,
                width: eWidth / 2,
                height: item.value * height,
                fill: item.color,
                opacity: .8,
                cornerRadius: 10
            });
            that.group.add(rect);

            var textTop = new Konva.Text({
                x: i * eWidth,
                y: -item.value * height - 20,
                width: eWidth,
                align: 'center',
                text: item.value * 100 + '%',
                fontSize: 10,
                fill: item.color,
                name: 'textTop'
            });
            that.group.add(textTop);

            var textBottom = new Konva.Text({
                x: i * eWidth,
                y: 10,
                width: eWidth,
                align: 'center',
                text: item.name,
                fontSize: 12,
                fontFamily: '微软雅黑',
                fontStyle: 'bold',
                fill: item.color
            });
            that.group.add(textBottom);
        })
    },
    addGroupOrLayer: function (arg) {
        arg.add(this.group);
    },
    histogramAnimate: function(arg){
        var that = this;

        arg.find('Rect').each(function (item, index) {
            item.y(0);
            item.height(0);
            item.to({
                duration: 1,
                y: - that.data[index].value * that.h,
                height: that.data[index].value * that.h
            });
        });

        arg.find('.textTop').each(function (item, index) {
            item.y(- 20);
            item.to({
                duration: 1,
                y: - that.data[index].value * that.h - 20
            });
        });
    }
};