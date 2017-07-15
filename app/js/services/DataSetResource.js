cbis.factory('DataSetResource', ['$resource', function( $resource ) {
  console.log("DataSetResource");
  return $resource(baseUrl + '/api/dataSets/:id.json', {'id': '@id'}, {
    query: {
      method: 'GET',
      isArray: false
    }
  });
}]);

cbis.factory('completeDataSetRegistrations', ['$resource', function( $resource ) {
  return $resource(baseUrl + '/api/completeDataSetRegistrations/:id', {'id': '@id'}, {
    query: {
      method: 'GET',
      isArray: false
    },
    save: {
      method:'POST',
      header: {"Content-Type": "application/json"},
      isArray:false
    }
  });
}]);
