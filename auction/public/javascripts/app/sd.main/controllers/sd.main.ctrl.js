(function () {
    'use strict';

    angular
        .module('auction')
        .controller('sd.main.ctrl', Controller);

    /** @ngInject */

    function Controller($scope, posts, auth) {
        $scope.posts = posts.posts;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.addPost = function () {
            if (!$scope.title || $scope.title === '') {
                return;
            }
            posts.create({
                title: $scope.title,
                link: $scope.title
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function (post) {
            posts.upvote(post);
        }
    }
})();
