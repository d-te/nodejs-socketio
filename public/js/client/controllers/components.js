var app = angular.module('ChatApp.ComponentsController', []);

app.controller('ComponentsController', [
	'$scope',
	'$rootScope',
	'SocketService',
	function($scope, $rootScope, SocketService){
		console.log('components');
	}
]);