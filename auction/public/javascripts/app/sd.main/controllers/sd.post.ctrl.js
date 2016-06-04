(function () {
    'use strict';

    angular
        .module('auction')
        .controller('sd.post.ctrl', Controller);

    /** @ngInject */

    function Controller($scope, posts, post, auth) {

        $scope.myNews = "";
        // var socket = io.connect('http://localhost:3000');
        var socket = io.connect('https://sd-auction.herokuapp.com');
        socket.on('news', function (data) {
            console.log(data);
            debugger;
            $scope.$apply(function () {
                $scope.news = data.hello
            });
            // socket.emit('sasi', {my: 'data'});
        });
        socket.emit('sasi', {my: 'data'});

        $scope.post = post;
        // This is temporary solutions, for fast explanation. 
        // We must find best way to implement this logic.
        $scope.posts = post.data;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.addComment = function () {
            if ($scope.body === '') {
                return;
            }
            posts.addComments(post._id, {
                body: $scope.body,
            }).success(function (comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };
        $scope.incrementUpvotes = function (comment) {
            posts.upvoteComment(post, comment);
        };
        $scope.sendNews = function () {
            socket.emit('sasi', {hello: $scope.myNews});
            // posts.removePost(postId).then(function (xxx) {
            //     posts.getPendingPost().then(function () {
            //         $scope.posts = posts.posts;
            //     });
            // });
        };
    }

})();
