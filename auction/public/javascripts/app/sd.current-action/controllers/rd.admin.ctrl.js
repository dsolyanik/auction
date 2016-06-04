(function () {
    'use strict';

    angular
        .module('rd.admin')
        .controller('rd.admin.ctrl', Controller);

    /** @ngInject */

    function Controller($scope, $http,  rdAdminSvc, rdGridTableFilterSvc, rdCommonUtilsSvc,  ENV, $state, rdGridSvc, rdTableSvc, $rootScope) {


        //$http.get('/assets/fixture/generated.json').then(function(response){
        //   console.log(response.data);
        //});

        $scope.isVisible = false;
        $scope.changeVisible = function(){

            $state.go('admin_id', '' || {});

        };

            $scope.arrayForUserMenu = [
            {icon:"home", text:"Administrator", items:"administrator"},
            {icon:"view_list", text:"Distributor", items:"distributor"},
            {icon:"tune", text:"Buyer", items:"buyer"}
        ];
       var programTypeParser = {
                hash: {
                    hdMovie: "Hd Movie",
                    tvSeries: "Tv Series"
                },
                match: function(input) {
                    return input ? this.hash[input] : undefined;
                }
           }
            var _default = {
                width: 120,
                minWidth: 40,
                maxWidth: 240,
                suppressMenu: true
            },

            columnDefs = [
                angular.extend(angular.copy(_default), {
                    field: "email",
                    headerName: "E-mail",
                    width: 400
                }),
                angular.extend(angular.copy(_default), {
                    field: "last_name",
                    headerName: "Last name",
                    width: 250
                }),
                angular.extend(angular.copy(_default), {
                    field: "first_name",
                    headerName: "First name",
                    width: 250
                }),
                  angular.extend(angular.copy(_default), {
                    field: "role",
                    headerName: "Role",

                    width: 250
                }),

                angular.extend(angular.copy(_default), {
                    field: "_id",
                    headerName: "Edit",
                    width: 85,
                    suppressMenu: true,
                    onCellClicked: clickCell,
                    cellRenderer: function() {
                        return '<a href="#"><i class="material-icons admin-icon-edit">edit</i></a>';
                    }
                }),
                angular.extend(angular.copy(_default), {
                    field: "btn",
                    headerName: "Delete",
                    width: 85,
                    suppressMenu: true,
                    //onCellClicked: clickCell(this),
                    cellRenderer: function() {
                        return '<a href="#"><i class="material-icons admin-icon-delete">clear</i></a>';
                    }
                }),
                angular.extend(angular.copy(_default), {
                    field: "btn",
                    headerName: "Activate",
                    width: 85,
                    suppressMenu: true,
                    cellRenderer: function() {
                        return '<a href="#"><i class="material-icons admin-icon-delete">notifications_active</i></a>';
                    }
                })

            ],
        tableFilter = {
            selectedItemChange: function (hash) {
                $scope.gridOptions.model.load({
                    filter: [hash]
                });
            }
        },
            gridFilter = {
                filterChange: function(hash) {console.log(hash);
                    $scope.tableOptions.model.filter.update([hash]);
                    $scope.tableOptions.api.onFilterChanged();
                }
            };
        $scope.currentRole = 'administrator';
        $scope.userFitering = function(item){
            $scope.currentRole = item;
            $scope.tableOptions.api.refreshView();
            console.log($scope.currentRole);
        };
       $scope.modelOptions =  {
           limit: 100,
           filter: [
               {
                   column: 'role',
                   operator: '=',
                   value: 'buyer'
               }
           ],
           endPoint: ENV.apiEndpoint + '/admin'

        };


        $scope.model = new rdAdminSvc.Model($scope.modelOptions);

        setTimeout(function () {
            $scope.modelOptions.filter = [];
            $scope.model = new rdAdminSvc.Model($scope.modelOptions);
            $scope.model.load({}).then(function(response) {
                $rootScope.api.setRowData($scope.model.list);
                $rootScope.api.refreshView();
            });

            console.info('Refreshed.', $scope.model);
        }, 2000);

        $scope.tableOptions = {
            model: $scope.model,
            virtualPaging: true,
            checkboxSelection: true,
            columnDefs: columnDefs,
            angularCompileRows: true,
            headerHeight: 50,
            rowHeight: 70,

            rowSelection: 'multiple',
            template: '/404',
            enableFiltering: true,
            onGridReady: function(hash) {
                $scope.tableOptions.api = hash.api;
            }
        };
        $scope.filters = {
            role: angular.extend(angular.copy(rdGridTableFilterSvc.role), tableFilter)
        }

        $scope.selectingRow = function(){
            $scope.isDisabled = false;
        };

        function clickCell(params) {
            var arg = {
                'user_id': params.data._id
            };
            $state.go('admin_id_edit', arg);
        }


    }
})();
