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