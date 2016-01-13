var app = angular.module('ChatApp.ChatController', []);

app.controller('ChatController', [
	'$scope',
	'$rootScope',
	'SocketService',
	'SocketListener',
	function($scope, $rootScope, SocketService, SocketListener) {
		$scope.user         = $rootScope.loggedUser;
		$scope.message      = '';

		$scope.messages     = SocketListener.messages;
		$scope.users        = SocketListener.users;
		$scope.selectedUser = null;

		$scope.send = function(form) {
			if (form.$valid) {
				if ($scope.selectedUser !== null) {
					SocketService.sendMessageToUser($scope.message, $scope.selectedUser._id);
				} else {
					SocketService.sendMessage($scope.message);
				}

				$scope.messages.push({
					user: $scope.user,
					recipient: $scope.selectedUser,
					text: $scope.message
				});
				$scope.message = '';
			}
		};

	}
]);
