(function () {
    'use strict';

    angular
        .module('auction')
        .factory('posts', Service);

    /** @ngInject */

    function Service($http, auth) {
        var o = {
            posts: [{
                title: 'hello', link: '', upvotes: 0, comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            }]
        };
        o.getAll = function () {
            return $http.get('/posts').success(function (data) {
                angular.copy(data, o.posts);
            });
        };
        o.getPendingPost = function () {
            return $http.get('/posts/suggestedposts').success(function (data) {
                angular.copy(data, o.posts);
            });
        };
        o.removePost = function (id) {
            return $http.delete('/posts/suggestedposts/' + id).success(function (data) {
                angular.copy(data, o.posts);
            });
        };
        o.create = function (post) {
            return $http.post('/posts', post,
                {
                    headers: {Authorization: 'Bearer ' + auth.getToken()}
                }).success(function (data) {
                o.posts.push(data);
            });
        };
        o.upvote = function (post) {
            return $http.put('/posts/' + post._id + '/upvote', null,
                {
                    headers: {Authorization: 'Bearer ' + auth.getToken()}
                }).success(function (data) {
                post.upvotes += 1;
            });
        };
        o.get = function (id) {
            return $http.get('/posts/' + id).then(function (res) {
                return res.data;
            });
        };

        o.addComments = function (id, comment) {
            return $http.post('/posts/' + id + '/comments', comment, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            });
        };
        o.upvoteComment = function (post, comment) {
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function (data) {
                comment.upvotes += 1;
            });
        };

        return o;
    }
})();
