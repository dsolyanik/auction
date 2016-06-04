(function () {
    'use strict';

    angular
        .module('rd.admin')
        .factory('rdAdminSvc', Service);

    /** @ngInject */


    function Service($rootScope, $http, rdEvents, RdCommonRestModelSvc, rdCommonUtilsSvc) {

        this.$get = function () {
            return this;
        };


        function collectFilterData(filterModel, filter) {
            var data = [];

            _.each(filterModel, function(item, index, hash) {
                data.push({
                    column: index,
                    value: item,
                    operator: "LIKE"
                });
            });

            return data;
        }

        function collectOrderData(sortModel, order) {
            var data = {};

            sortModel.forEach(function(item) {
                data[item.colId] = item.sort;
            });

            _.each(order, function(item, index, hash) {
                if(data[index] === undefined) {
                    data[index] = undefined;
                }
            });

            return data;
        }

        this.Model = function(options) {
            RdCommonRestModelSvc.apply(this, arguments);
        };

        angular.extend(this.Model.prototype, angular.copy(RdCommonRestModelSvc.prototype));

        this.headerCheckboxField = {
            field: "id",
            width: 30,
            checkboxSelection: true,
            headerCellTemplate: function(hash) {
                var eCell = document.createElement('span');

                //eCell.innerHTML = '<input type="checkbox">';
                //eCell.querySelector('input').addEventListener('change', function(e) {
                //    var method = !!this.checked ? 'selectNode' : 'deselectNode';
                //
                //    hash.api.forEachNode( function (node) {
                //        hash.api[method](node, true);
                //    });
                //});

                return eCell;
            }
        }



        this.makeDatasource = function (options) {
            var model = options.model;

            return {
                rowCount: null, // behave as infinite scroll
                pageSize: model.limit,
                overflowSize: model.limit,
                maxConcurrentRequests: 2,
                maxPagesInCache: 2,
                filter: [],
                order: {},
                getRows: function (params) {
                    var self = this;

                    this.filter = collectFilterData(params.filterModel, this.filter);
                    this.order = collectOrderData(params.sortModel, this.order);

                    var data = {
                        filter: this.filter,
                        order: this.order
                    };

                    model.load(data, {more: params.startRow !== 0}).then(function(response) {
                        _.each(self.order, function(item, index, hash) {
                            if(item === undefined) {
                                delete hash[index];
                            }
                        });
                        params.successCallback(response.data.list, model.length <= model.list.length ? model.length : -1);
                    });
                }
            };
        };
        return this;
    }
})();
