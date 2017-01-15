/**
 * Created by Administrator on 2016/12/12.
 */
function PieChart(option) {
    this._init(option);
}
PieChart.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.radius = option.radius || 0;
        this.data = option.data || '';

        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });

        this.wedgeGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        this.txtGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        this.group.add(this.wedgeGroup);
        this.group.add(this.txtGroup);

        var that = this,
            tempAngle = -90,
            textAngle = 0;
        this.data.forEach(function (item) {
            var wedge = new Konva.Wedge({
                x: 0,
                y: 0,
                radius: that.radius,
                angle: item.value * 360,
                fill: item.color,
                rotation: tempAngle
            });
            that.wedgeGroup.add(wedge);

            textAngle = item.value * 180 + tempAngle;
            var text = new Konva.Text({
                x: (that.radius + 30) * Math.cos(textAngle * Math.PI / 180),
                y: (that.radius + 30) * Math.sin(textAngle * Math.PI / 180),
                text: item.name,
                fontSize: 25,
                fill: item.color
            });

            if (textAngle > 90 && textAngle < 270) {
                text.x(text.x() - text.getWidth());
            }
            that.txtGroup.add(text);

            tempAngle += item.value * 360;
        });

        this._animateIndex = 0;
    },
    addGroupOrLayer: function (arg) {
        arg.add(this.group);
    },
    animateStart: function () {
        var that = this;
        if (this._animateIndex == 0) {
            this.wedgeGroup.getChildren().each(function (item) {
                item.angle(0);
            });
            this.txtGroup.getChildren().each(function (item) {
                item.text('');
            });
        }

        this.wedgeGroup.getChildren()[that._animateIndex].to({
            angle: that.data[that._animateIndex].value * 360,
            duration: that.data[that._animateIndex].value * 2,
            onFinish: function () {
                that._animateIndex++;
                if (that._animateIndex >= that.data.length) {
                    that.txtGroup.getChildren().each(function(item,index){
                        item.text(that.data[index].name);
                    });
                    that._animateIndex = 0;
                    return;
                }
                that.animateStart();
            }
        });
    }
};