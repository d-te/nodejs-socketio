var app = angular.module('ChatApp.UsersController', []);

app.controller('UsersController', [
	'$scope',
	'$rootScope',
	'SocketService',
	function($scope, $rootScope, SocketService){
		$scope.statistics = function(component, event, value) {
			SocketService.sendEvent(component, event, value);
		};
	}
]);