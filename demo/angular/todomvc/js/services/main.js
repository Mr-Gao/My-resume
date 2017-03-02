// 服务主函数
(function (angular) {
	// 服务模块
	angular.module('servicesModule', [])
		.service('MainService', ['$window', function ($window) {
			// 浏览器缓存
			var storage = $window.localStorage;

			// 数据
			var tasks = storage['todo_list'] ? JSON.parse(storage['todo_list']) : [];

			// 暴露数据
			this.getData = function () {
				return tasks;
			};

			function save() {
				storage['todo_list'] = JSON.stringify(tasks);
			}

			// 获取ID
			function getId() {
				var id = Math.random();
				if (tasks.length) {
					for (var i = 0; i < tasks.length; i++) {
						if (tasks[i].id === id) {
							id = getId();
							break;
						}
					}
				}
				return id;
			}

			// 添加任务业务逻辑
			this.add = function (text) {
				tasks.push({
					id: getId(),
					text: text,
					completed: false
				});
				save();
			};

			// 删除任务业务逻辑
			this.remove = function (id) {
				for (var i = 0; i < tasks.length; i++) {
					if (tasks[i].id === id) {
						tasks.splice(i, 1);
						break;
					}
				}
				save();
			};

			// 删除已完成任务业务逻辑
			this.clear = function () {
				var tasksArr = [];
				for (var i = 0; i < tasks.length; i++) {
					if (!tasks[i].completed) {
						tasksArr.push(tasks[i]);
					}
				}
				tasks = tasksArr;
				save();
				return tasks;
			};

			// 全选任务逻辑
			var now = true;
			this.all = function () {
				for (var i = 0; i < tasks.length; i++) {
					tasks[i].completed = now;
				}
				now = !now;
				save();
			};

			// 判断是否存在已完成任务业务逻辑
			this.exist = function () {
				for (var i = 0; i < tasks.length; i++) {
					if (tasks[i].completed) {
						return true;
					}
				}
				return false;
			};

		}]);
})(angular);
