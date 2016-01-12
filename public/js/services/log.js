var app = angular.module('ChatApp.LogService', []);

app.service('LogService', [
	'$http',
	'$q',
	function ($http, $q) {
		var listeners = {};

		var service = {
			getUserActions: getUserActions,
		};

		function getUserActions() {
			var request = $http({
				method: 'get',
				url: 'api/log/user-actions',
			});

			return(request.then(handleSuccess, handleError));
		}

		function handleError(response) {
			if (angular.isObject(response.data) && response.data.message) {
				return($q.reject(response.data.message));
			}
			return($q.reject(response.data));
		}

		function handleSuccess(response) {
			return(response.data);
		}

		return service;
	}
]);
