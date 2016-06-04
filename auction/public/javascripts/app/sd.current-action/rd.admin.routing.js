(function () {
    'use strict';

    angular
        .module('rd.admin')
        .config(Config);

    /** @ngInject */
    function Config($stateProvider) {

        $stateProvider
            .state({
                parent: 'rd',
                name: 'admin',
                url: '/admin',
                views: {
                    '@':
                    {

                        templateUrl: 'rd.admin/templates/admin.html',
                        controller: 'rd.admin.ctrl'

                    }
                }

            })
            .state('admin_id_edit',{
                name: 'admin_id_edit',
                url: '/admin_id_edit/:user_id',

                views: {
                    '@': {
                        templateUrl: 'rd.admin/templates/admin_id_edit.html',
                        controller: 'rd.admin_id_edit.ctrl'
                    }

                }
            })
            .state('admin_id',{
                name: 'admin_id',
                url: '/admin_id',

                views: {
                    '@': {
                        templateUrl: 'rd.admin/templates/admin_id.html',
                        controller: 'rd.admin_id.ctrl'
                    }

                }
            });
      }

})();
