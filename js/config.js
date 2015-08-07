/**
 * Created by JAMES on 08/06/15.
 */

//compatible with jQuery mobile
/*$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;*/

//register
var jpApp = angular.module('jpApp', ['ngRoute']);

jpApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:'BooksController',
                templateUrl:'books.html'

            })
            .when('/book', {
                controller:'BookController',
                templateUrl:'stuff.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    }]);
//
//jpApp.directive('jqm', function($timeout) {
//    return {
//        link: function(scope, elm, attr) {
//            $timeout(function(){
//                elm.trigger('create');
//            });
//        }
//    };
//});

