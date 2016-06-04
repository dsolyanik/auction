

(function () {
    'use strict';

    angular
        .module('rd.admin')
        .controller('rd.admin_id.ctrl', Controller);

    /** @ngInject */

    function Controller($scope, rdAdminSvc, rdCommonUtilsSvc, ENV, $state,  $mdDialog) {
        $scope.goToAdmin = function(){
            $state.go('admin', '' || {});
        };

        $scope.saveUser = function(){
            $http({
                method: 'POST',
                url: '/someUrl'
            }).then(function successCallback(response) {
                $state.go('admin', '' || {});

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('This is an alert title')
                            .textContent('User has been saved.')
                            .ariaLabel('')
                            .ok('OK')
                            .targetEvent(ev)
                    );

            }, function errorCallback(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('This is an alert title')
                        .textContent('User has not been saved.')
                        .ariaLabel('Error')
                        .ok('OK')
                        .targetEvent(ev)
                );
            });
        };
        //$http.get('/assets/fixture/generated.json').then(function(response){
        //    console.log(response.data);
        //});
        //alert(nameStorage);
}
})();