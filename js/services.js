
var jpServices = angular.module('jpServices', ['ngResource']);

jpServices.factory('Books', ['$resource',
    function($resource){
        return $resource('books/:bookId.json', {}, {
            query: {method:'GET', params:{bookId:'@bookId'}, isArray:true}
        });
    }]);