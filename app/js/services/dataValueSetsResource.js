cbis.factory('dataValueSetsResource', ['$resource', function( $resource ) {
    console.log("dataValueSetsResource");
    return $resource(baseUrl + '/api/dataValueSets/:id.json', {'id': '@id'}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}]);


cbis.factory('dataValueSetsResourceEdit', ['$resource', function( $resource ) {
    console.log("dataValueSetsResourceEdit");
    return $resource(baseUrl + '/api/dataValueSets/:id', {'id': '@id'}, {
        query: {
            method: 'GET',
            isArray: false
        },
        update: {
            method:'PUT',
            isArray:false,
            header: {"Content-Type": "application/json"}
        },
        save: {
            method:'POST',
            header: {"Content-Type": "application/json"},
            isArray:false
        }
    });
}]);