var app = angular.module('ChatApp.ActionsController', []);

app.controller('ActionsController', [
	'$scope',
	'$rootScope',
	'SocketService',
	function($scope, $rootScope, SocketService){
		console.log('actions');
	}
]);
