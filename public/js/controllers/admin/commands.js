var app = angular.module('ChatApp.CommandsController', []);

app.controller('CommandsController', [
	'$scope',
	'$rootScope',
	'SocketService',
	'SocketListener',
	function($scope, $rootScope, SocketService, SocketListener) {
		$scope.user     = $rootScope.loggedUser;
		$scope.message  = '';
		$scope.messages = SocketListener.messages;

		$scope.send = function(form) {
			if (form.$valid) {
				SocketService.sendMessage($scope.message);

				$scope.messages.push({
					user: $scope.user,
					text: $scope.message
				});
				$scope.message = '';
			}
		};

	}
]);
