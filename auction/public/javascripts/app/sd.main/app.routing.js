(function () {
    'use strict';

    angular
        .module('auction')
        .config(Config);

    /** @ngInject */
    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home',{
            url: '/home',
            templateUrl: '/home.html',
            controller: 'sd.main.ctrl',
            resolve: {
                postPromise: ['posts', function (posts) {
                    return posts.getAll();
                }]
            }
        });
        $stateProvider.state('posts',{
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'sd.post.ctrl',
            resolve : {
                post : ['$stateParams', 'posts', function ($stateParams, posts) {
                    return posts.get($stateParams.id);
                }]
            }
        });
        $stateProvider.state('suggestedposts',{
            url: '/suggestedposts',
            templateUrl: '/suggestedposts.html',
            controller: 'sd.post.ctrl',
            resolve : {
                post : ['posts', function (posts) {
                    return posts.getPendingPost();
                }]
            }
        });

        $urlRouterProvider.otherwise('home');
    }

})();
