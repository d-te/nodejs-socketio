var app = angular.module('ChatApp.ActionsController', []);

app.controller('ActionsController', [
	'$scope',
	'LogService',
	function($scope, LogService){
		$scope.actions = [];

		LogService
			.getUserActions()
			.then(function(actions){
					$scope.actions = actions;
				},
				function(reason){
					console.log(reason);
				}
			);
	}
]);
