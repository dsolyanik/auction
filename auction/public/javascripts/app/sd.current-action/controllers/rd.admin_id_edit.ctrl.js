

(function () {
    'use strict';

    angular
        .module('rd.admin')
        .controller('rd.admin_id_edit.ctrl', Controller);

    /** @ngInject */

    function Controller($scope, rdAdminSvc, rdCommonUtilsSvc, ENV, $stateParams, $state) {
        $scope.user={
            "_id": "56dd4ac2225168cde965fc5b",
            "email": "castrooconnor@jamnation.com",
            "enabled": false,
            "role": "administrator",
            "user_password": "1122d4db-c5e9-4c20-8034-5bb3a82ec750",
            "last_login": "2015-02-15T06:32:17 -02:00",
            "expired": true,
            "expiresAt": "2015-10-13T01:13:15 -03:00",
            "first_name": "Mayra",
            "last_name": "Robbins",
            "company_name": "ONTAGENE",
            "office_phone_number": "+1 (969) 598-2362",
            "cell_phone_number": "+1 (852) 488-2462",
            "job_title": "Darlington",
            "industry_name": "Cablam",
            "country": "function (a){return c.getItem(\"countries\")[a?\"abbr\":\"name\"]}",
            "e_media": false
        };
        console.log($stateParams);
        $scope.goToAdmin = function(){
            $state.go('admin', '' || {});
        }
        //alert(nameStorage);
}
})();