
angular.module('jpApp', ['ngRoute', 'jpControllers','jpFilters', 'jpServices']).


/* Route config */
angular.module('jpAppRoute',['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/books', {
                    templateUrl: '../index.html',
                    controller: 'PhonesController'
                }).
                when('/book/:bookId',{
                    templateUrl: '../stuff.html',
                    controller: 'BookController'
                }).
                otherwise({
                    redirectTo: '/index'
                });
}]);


