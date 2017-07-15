
cbis.factory('orgUnitResource',['$resource', function ($resource) {
    console.log('****************** entrer dans orgUnitResource');
    return $resource(
        baseUrl + '/api/organisationUnits/:id.json', {id: "@id"}, {
            query:  {
                method:'GET',
                //params: {id: "@id"},
                isArray:false
            },
            save: {
                method:'POST',
                header: {"Content-Type": "application/json"},
                // params: {id: "@id"},
                isArray:false
            },
            update: {
                method:'PUT',
                isArray:false,
                header: {"Content-Type": "application/json"}
                // params: {id: "@id"},
            }
        }

    );

} ]);

cbis.factory('orgUnitDelete',['$resource', function ($resource) {
    //console.log('****************** entrer dans orgUnitDelete');
    return $resource(
        baseUrl + '/api/organisationUnits/:id', {id: "@id"},{
            update: {
                method:'PUT',
                isArray:false,
                header: {"Content-Type": "application/json"},
                // params: {id: "@id"},
            },
            save: {
                method:'POST',
                header: {"Content-Type": "application/json"},
                // params: {id: "@id"},
                isArray:false
            }
        }
    )
} ]);

cbis.factory('orgUnitLevel',['$resource', function ($resource) {
    //console.log('****************** entrer dans orgUnitLevel');
    return $resource(baseUrl + '/api/organisationUnitLevels/:id.json', {id: "@id"},{
            update: {
                method:'PUT',
                isArray:false,
                header: {"Content-Type": "application/json"}
                // params: {id: "@id"},
            },
            save: {
                method:'POST',
                header: {"Content-Type": "application/json"},
                isArray:false
            }
        }
    )
} ]);