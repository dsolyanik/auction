(function () {
    'use strict';

    angular
        .module('auction')
        .directive('sdCurrentAuction', Directive);


    // function Directive() {
    //     var directive = {};
    //
    //     directive.restrict = 'E';
    //     /* restrict this directive to elements */
    //
    //     directive.template = "My first directive: {{textToInsert}}";
    //
    //     return directive;
    // }


    function Directive() {
        return {
            restrict: 'E',
            // templateUrl: '../templates/test.html'
            // templateUrl: '/test.html'
            templateUrl: '/javascripts/app/sd.main/templates/current-auction.html'
            // template: "My first directive: {{textToInsert}}"
            // controller: 'sd.main.ctrl',
            // scope: {
            //     options: '='
            // },
            // link: function postLink($scope, $element, $attrs) {
            //
            //     $element.on('$click', function() {
            //         console.log("sasi")
            //     });
            // }
        };
    }
})();
