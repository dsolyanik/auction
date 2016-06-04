(function () {
    'use strict';

    angular
        .module('sd.authentication')
        .config(Config);

    /** @ngInject */
    function Config($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'sd.authentication.ctrl',
                onEnter: ['$state', 'auth', function ($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'sd.authentication.ctrl',
                onEnter: ['$state', 'auth', function ($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            });
    }

})();
