var app = angular.module('ChatApp.AuthController', []);

app.controller('AuthController', [
	'$scope',
	'$rootScope',
	'$location',
	'socket',
	'localStorageService',
	function($scope, $rootScope, $location, socket, localStorageService){
		$scope.user = localStorageService.get('user') || {};

		$scope.login = function(form) {
			if (form.$valid) {
				socket.emit('user:login', $scope.user);
			}
		};

		socket.on('user:id', function(data){
			localStorageService.set('user', $scope.user);
			$location.path('/chat');
		});
	}
]);
