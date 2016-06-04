(function () {
    'use strict';

    angular
        .module('auction')
        .controller('sd.nav.ctrl', Controller);

    /** @ngInject */

    function Controller($scope, auth) {
        $scope.isModerator = auth.isModerator;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }
})();
