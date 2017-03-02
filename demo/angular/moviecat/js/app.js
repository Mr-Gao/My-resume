(function (angular) {
    'use strict';
    // 主入口
    angular.module('moviecat', [
            'ngRoute',
            'moviecat.list',
            'moviecat.movice_detail'
        ])
        .config([
            '$routeProvider',
            '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider.otherwise({redirectTo: '/in_theaters/p1'});
                $locationProvider.hashPrefix('');
            }])
        .controller('searchController', ['$scope', '$route', function ($scope, $route) {
            $scope.searchText = '';
            $scope.search = function () {
                $route.updateParams({q: $scope.searchText, page: 1, category: 'search'});
                $scope.searchText = '';
            };
        }]);
})(angular);
