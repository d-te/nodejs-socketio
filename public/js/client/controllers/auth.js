var app = angular.module('ChatApp.AuthController', []);

app.controller('AuthController', [
	'$scope',
	'$rootScope',
	'$location',
	'localStorageService',
	'AuthService',
	'SocketService',
	function($scope, $rootScope, $location, localStorageService, AuthService, SocketService){
		$scope.user = localStorageService.get('user') || {};

		$scope.login = function(form) {
			if (form.$valid) {
				AuthService
					.login($scope.user)
					.then(function(user){
							$rootScope.loggedUser = user;

							SocketService.init();

							$location.path('/chat');
						},
						function(reason){
							console.log(reason);
						}
					);
			}
		};
	}
]);
