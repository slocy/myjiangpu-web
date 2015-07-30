/**
 * Created by JAMES on 07/29/15.
 */

var jpControllers = angular.module('jpControllers', []);

jpControllers.controller('BooksCtrl', ['$scope', 'Books', function($scope, Books) {
    $scope.books = Books.query();
}]);



    /*

function BooksController($scope, Books) {
    $scope.books = Books.query();
}



function BookController($scope, $routeParams, Books) {
    $scope.book = Books.get({bookId: $routeParams.bookId},
        function(book) {
            $scope.bookId = book.bookId;
            $scope.title = book.title;
            $scope.images = book.images;
    });

}
*/