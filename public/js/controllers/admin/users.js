var app = angular.module('ChatApp.UsersController', []);

app.controller('UsersController', [
	'$scope',
	'$rootScope',
	'UserService',
	function($scope, $rootScope, UserService){
		$scope.users = [];

		UserService
			.getUsers()
			.then(function(users){
					$scope.users = users;
				},
				function(reason){
					console.log(reason);
				}
			);
	}
]);