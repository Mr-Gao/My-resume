/**
 * Created by Administrator on 2016/12/9.
 */
function Sprite(option) {
    this._init(option);
}
Sprite.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;

        this.originW = option.originW || 40;
        this.originH = option.originH || 65;

        this.imgW = option.imgW || 40;
        this.imgH = option.imgH || 65;

        this._imgSrc = option.imgSrc || '';
        this.fps = option.fps || 10;
        this.dirIndex = 0;

    },
    render: function (ctx) {
        var img = new Image();
        img.src = this._imgSrc;
        var that = this;
        img.onload = function () {
            var frameIndex = 0;
            setInterval(function () {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(
                    img,
                    frameIndex * that.originW,
                    that.dirIndex * that.originH,
                    that.originW,
                    that.originH,
                    that.x,
                    that.y,
                    that.imgW,
                    that.imgH
                );
                frameIndex++;
                frameIndex %= 4;
            }, 1000 / that.fps);
        }
    },
    changeDir: function (e) {
        if (e == 37)this.dirIndex = 1;
        if (e == 38)this.dirIndex = 3;
        if (e == 39)this.dirIndex = 2;
        if (e == 40)this.dirIndex = 0;
    }
};