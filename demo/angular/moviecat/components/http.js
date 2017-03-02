(function (angular) {
    'use strict';
    // 异步请求模块
    angular.module('moviecat.service.http', [])
        .service('httpService', ['$window','$document', function ($window,$document) {
        // 异步请求函数
        this.jsonp = function (url, data, callback) {
            // 检测url地址是否包含？号
            var queryString = url.indexOf('?') == -1 ? '?' : '&';
            // 随机生成回调名称
            var callbackName = 'cb_' + Math.random().toString().replace('.', '');
            // 遍历参数 添加到url地址中
            for (var key in data) {
                queryString += key + '=' + data[key] + '&';
            }
            // 添加回调参数到url
            queryString += 'callback=' + callbackName;
            // 创建script标签
            var scriptElement = $document[0].createElement('script');
            // 设置script标签src属性
            scriptElement.src = url + queryString;
            // 挂靠回调函数到全局window对象上
            $window[callbackName] = function(data){
                callback(data);
                // 执行完回调删除script标签
                $document[0].body.removeChild(scriptElement);
            };
            // 添加script标签到body中
            $document[0].body.appendChild(scriptElement);
        }

    }]);

})(angular);
