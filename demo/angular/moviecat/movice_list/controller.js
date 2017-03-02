(function (angular) {
    'use strict';
    // 列表模块
    angular.module('moviecat.list', ['ngRoute', 'moviecat.service.http'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/:category/p:page', {
                templateUrl: 'movice_list/view.html',
                controller: 'ListController'
            });
        }])
        .controller('ListController', [
            '$scope',
            '$route',
            '$routeParams',
            'httpService',
            '$location',
            function ($scope, $route, $routeParams, httpService, $location) {
                $scope.title = 'Loading...';
                // 每页显示条数
                var count = 18;
                $scope.page = parseInt($routeParams.page);
                // 当前页开始条数
                var start = ($scope.page - 1) * count;
                // 加载动画控制变量
                $scope.loading = true;
                // 总条数
                $scope.totalCount = 0;
                // 总页数
                $scope.totalPage = 0;
                $scope.subjects = [];

                // 当前页面分类
                $scope.category = $routeParams.category;
                httpService.jsonp('http://api.douban.com/v2/movie/' + $routeParams.category, {
                    start: start,
                    count: count,
                    q: $routeParams.q
                }, function (data) {
                    // 请求的数据
                    $scope.title = data.title;
                    $scope.subjects = data.subjects;
                    $scope.loading = false;
                    $scope.totalCount = data.total;
                    $scope.totalPage = Math.ceil($scope.totalCount / count);
                    // 重新加载$scope模型
                    $scope.$apply();
                });

                // 翻页控制函数
                $scope.toPage = function (page) {
                    if (page >= 1 && page <= $scope.totalPage) {
                        $route.updateParams({page: page});
                    }
                };
                // 跳转详情页
                $scope.toDetail = function (id) {
                    $location.path('/subject/'+id);
                };
            }]);
})(angular);


