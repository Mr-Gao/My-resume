// 控制器主函数
(function (angular) {
	'use strict';
	// 控制器模块
	angular.module('controllersModule', ['servicesModule'])
		.controller('MainController', [
			'$scope',
			'$location',
			'MainService',
			function ($scope, $location, MainService) {

				// 数据模型
				$scope.text = '';

				// 数据
				$scope.tasks = MainService.getData();

				// 添加任务
				$scope.add = function () {
					if (!$scope.text) {
						return;
					}
					MainService.add($scope.text);
					$scope.text = '';
				};

				// 删除任务
				$scope.remove = function (id) {
					MainService.remove(id);
				};

				// 删除已完成任务
				$scope.clear = function () {
					$scope.tasks = MainService.clear();
				};

				// 全选
				$scope.all = function () {
					MainService.all();
				};

				// 判断是否存在已完成任务
				$scope.exist = function () {
					return MainService.exist();
				};

				// 正在编辑项ID模型
				$scope.editingId = -1;

				// 修改任务
				$scope.editing = function (id) {
					for (var i = 0; i < $scope.tasks.length; i++) {
						if (!$scope.tasks[i].completed && $scope.tasks[i].id === id) {
							$scope.editingId = id;
							break;
						}
					}
				};

				// 保存修改
				$scope.save = function () {
					$scope.editingId = -1;
				};

				// 状态筛选
				$scope.selected = {};
				$scope.$location = $location;
				$scope.$watch('$location.hash()', function (now) {
					switch (now) {
						case '/active':
							$scope.selected = {completed: false};
							break;
						case '/completed':
							$scope.selected = {completed: true};
							break;
						default:
							$scope.selected = {};
							break;
					}
				});

				// filter是模糊查询   添加一个自己定义匹配规则
				$scope.equal = function (source, target) {
					return source === target;
				}
			}]);

})(angular);
