var app = angular.module('ChatApp.ChatController', []);

app.controller('ChatController', [
	'$scope',
	'$rootScope',
	'SocketService',
	'SocketListener',
	function($scope, $rootScope, SocketService, SocketListener) {
		$scope.user     = $rootScope.loggedUser;
		$scope.message  = '';
		$scope.messages = [];

		SocketListener.addEventListener('onUserJoin', function(user){
			$scope.messages.push({
				text: user.name + ' has joined'
			});
		});

		SocketListener.addEventListener('onUserLeft', function(user){
			$scope.messages.push({
				text: user.name + ' has left'
			});
		});

		SocketListener.addEventListener('onSendMessage', function(data){
			$scope.messages.push({
				user: data.user,
				text: data.text
			});
		});

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
