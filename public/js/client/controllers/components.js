var app = angular.module('ChatApp.ComponentsController', []);

app.controller('ComponentsController', [
	'$scope',
	'$rootScope',
	'SocketService',
	function($scope, $rootScope, SocketService){
		$scope.statistics = function(component, event, value) {
			SocketService.sendEvent(component, event, value);
		};
	}
]);