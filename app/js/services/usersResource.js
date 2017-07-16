cbis.factory('usersResource', ['$resource', function( $resource ) {
    return $resource(baseUrl + '/api/users/:id.json', {'id': '@id'}, {
        query: {
            method: 'GET',
            isArray: false,
            /*transformResponse: function(data) {
             return JSON.parse(data).users;
             }*/
        }
    });
}]);

cbis.factory('me', ['$resource', function( $resource ) {
    console.log("entrer dans factory Me");
    return $resource(baseUrl + '/api/me/:id.json', {'id': '@id'}, {
        query: {
            method: 'GET'
            /*isArray: false,
            transformResponse: function(data) {
             return JSON.parse(data).users;
             }*/
        }
    });
}]);