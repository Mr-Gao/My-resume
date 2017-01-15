/**
 * Created by Administrator on 2016/12/11.
 */
function CircleText(option) {
    this._init(option);
}

CircleText.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;

        this.outRadius = option.outRadius || 0;
        this.innerRadius = option.innerRadius || 0;
        this.circleColor = option.circleColor || 'black';
        this.ringColor = option.ringColor || 'black';

        this.textValue = option.textValue || '';

        //创建一个内部组
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });
        //创建一个内部圆
        this.circle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.innerRadius,
            opacity: 0.8,
            fill: this.circleColor
        });
        this.group.add(this.circle);

        //创建一个圆环
        this.innerRing = new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius: this.innerRadius,
            outerRadius: this.outRadius,
            fill: this.ringColor,
            opacity: .5
        });
        this.group.add(this.innerRing);

        //创建一个文字
        this.text = new Konva.Text({
            x: - this.outRadius,
            y: -8,
            width: this.outRadius * 2,
            align: 'center',
            text: this.textValue,
            fontSize: 16,
            fontFamily: '微软雅黑',
            fontStyle: 'bold',
            fill: '#fff'
        });
        this.group.add(this.text);
    },
    addToGroupOrLayer: function(arg){
        arg.add(this.group);
    }
};