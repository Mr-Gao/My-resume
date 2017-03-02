(function (angular) {
    'use strict';
    // 详情模块
    angular.module('moviecat.movice_detail', ['ngRoute', 'moviecat.service.http'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/subject/:id', {
                templateUrl: 'movice_detail/view.html',
                controller: 'DetailController'
            });
        }])
        .controller('DetailController', [
            '$scope',
            '$route',
            '$routeParams',
            'httpService',
            function ($scope, $route, $routeParams, httpService) {
                $scope.details = {};
                httpService.jsonp(
                    'http://api.douban.com/v2/movie/subject/' + $routeParams.id,
                    {},
                    function (data) {
                        $scope.details = data;
                        $scope.$apply();
                    });
            }]);
})(angular);


