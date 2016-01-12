var app = angular.module('ChatApp.UserService', []);

app.service('UserService', [
	'$http',
	'$q',
	function ($http, $q) {
		var listeners = {};

		var service = {
			getUsers: getUsers,
		};

		function getUsers() {
			var request = $http({
				method: 'get',
				url: 'api/user',
				params: {limit: '0'}
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
