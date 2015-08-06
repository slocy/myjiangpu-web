/**
 * Created by JAMES on 07/29/15.
 */

angular.module('jpApp',[])
    .controller('BooksController',function($scope,$http){
        $http({
            method: 'GET',
            url: '/books.json'
        }).success(function(response, status, headers, config){
            $scope.books = response;
        });

    });


//
//var BooksController = function($scope, $http){
//    $http({
//        method: 'GET',
//        url: 'http://localhost:63342/myjiangpu-web/books.json'
//    }).success(function(response, status, headers, config){
//        $scope.books = response;
//    });
//}
//
//
//function BookController($scope, $routeParams, Books) {
//
//    $scope.book = Books.get({bookId: $routeParams.bookId},
//        function(book) {
//            $scope.bookId = book.bookId;
//            $scope.title = book.title;
//            $scope.images = book.images;
//        });
//}

