/**
 * Created by JAMES on 07/29/15.
 */

/*
var jpControllers = angular.module('jpControllers', []);

jpControllers.controller('BooksCtrl', ['$scope', 'Books', function($scope, Books) {
    $scope.books = Books.query();
}]);
*/


function BooksController($scope) {
    $scope.books =[
            {
                "bookId":"1",
                "title":"胸花匠谱",
                "image":"img/assert/ruping-p1-main.png",
                "artisan":{
                    "name":"茹茹萍",
                    "image":"img/artisan/ruping2.jpg",
                    "location":"厦门"
                }
            },
            {
                "bookId":"2",
                "title":"胸花匠谱",
                "image":"img/assert/ruping-p1-main.png",
                "artisan":{
                    "name":"茹茹萍",
                    "image":"img/artisan/ruping2.jpg",
                    "location":"厦门"
                }
            }
    ];

     // Books.query();
}



function BookController($scope, $routeParams, Books) {
    $scope.book = Books.get({bookId: $routeParams.bookId},
        function(book) {
            $scope.bookId = book.bookId;
            $scope.title = book.title;
            $scope.images = book.images;
    });

}

