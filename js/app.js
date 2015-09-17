(function() {
    angular.module('jpApp', ['ngRoute', 'jpServices', 'jpRoute']);

})();
/* Route config */
(function() {

angular.module('jpRoute',['ngRoute']).config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/books', {
                    templateUrl: '../Index.html',
                    controller: 'BooksController'
                }).
                when('/book/:bookId',{
                    templateUrl: '../stuff.html',
                    controller: 'BookController'
                }).
                otherwise({
                    redirectTo: '/index'
                });
}]);

})();


