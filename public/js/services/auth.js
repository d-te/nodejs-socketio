var app = angular.module('ChatApp.AuthService', []);

app.service('AuthService', [
	'$http',
	'$q',
	function ($http, $q) {
		var service = {
			login: login,
		};

		function login(user) {
			var request = $http({
				method: 'post',
				url: 'api/auth/login',
				data: user
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
