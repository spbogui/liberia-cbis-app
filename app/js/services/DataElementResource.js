cbis.factory('DataElementResource', ['$resource', function( $resource ) {
    console.log("DataElementResource");
    return $resource(baseUrl + '/api/dataElements/:id.json', {'id': '@id'}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}]);