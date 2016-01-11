var app = angular.module('ChatApp.AuthController', []);

app.controller('AuthController', [
	'$scope',
	'$rootScope',
	'$location',
	'localStorageService',
	'AuthService',
	'SocketListener',
	function($scope, $rootScope, $location, localStorageService, AuthService, SocketListener){
		$scope.user = localStorageService.get('user') || {};

		$scope.login = function(form) {
			if (form.$valid) {
				AuthService
					.login($scope.user)
					.then(function(user){
							$rootScope.loggedUser = user;

							SocketListener.init();

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
