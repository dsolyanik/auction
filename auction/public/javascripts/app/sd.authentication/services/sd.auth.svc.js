(function () {
    'use strict';

    angular
        .module('sd.authentication')
        .factory('auth', Service);

    /** @ngInject */

    function Service($http, $window) {
        var auth = {};

        auth.saveToken = function (token) {
            $window.localStorage['sd-auction-token'] = token;
        };

        auth.getToken = function () {
            return $window.localStorage['sd-auction-token'];
        };

        auth.isLoggedIn = function () {
            var token = auth.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.isModerator = function () {
            var token = auth.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.role == "moderator" && payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.isPublisher = function () {
            var token = auth.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.role == "publisher" && payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function () {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.register = function (user) {
            return $http.post('/register', user).success(function (data) {
                auth.saveToken(data.token);
            })
        };

        auth.logIn = function (user) {
            return $http.post('/login', user).success(function (data) {
                auth.saveToken(data.token);
            })
        };

        auth.logOut = function () {
            $window.localStorage.removeItem('sd-auction-token');
        };

        return auth;
    }
})();
