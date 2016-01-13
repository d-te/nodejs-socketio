var app = angular.module('ChatApp.CommandsController', []);

app.controller('CommandsController', [
	'$scope',
	'$rootScope',
	'SocketService',
	'SocketListener',
	function($scope, $rootScope, SocketService, SocketListener) {
		$scope.user         = $rootScope.loggedUser;
		$scope.command      = '';

		$scope.commands     = SocketListener.commands;
		$scope.users        = SocketListener.users;
		$scope.selectedUser = null;

		$scope.send = function(form) {
			if (form.$valid) {
				SocketService.sendCommand($scope.command, $scope.selectedUser._id);

				$scope.commands.push({
					user: $scope.user,
					recipient: $scope.selectedUser,
					command: $scope.command
				});
				$scope.command = '';
			}
		};

	}
]);
