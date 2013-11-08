
mobileApp.factory('serverApi', ['$http', '$log', 'memberShip', function ($http, $log) {

    var request = function (method, resource, entity, parameters) {

        var response = {};

        response._successFn = function (data, status, headers, config) { };

        response.success = function (fn) { this._successFn = fn; };

        response._errorFn = function (data, status, header, config) { };

        response.error = function (fn) { this._errorFn = fn; };

        $http({
            method: method,
            url: memberShip.getHostServer + "/api/" + resource,
            params: parameters,
            data: entity,
            headers: { 'Content-Type': 'application/json' }
        })
        .success(function (data, status, headers, config) {

            response._successFn(data, status, headers, config);
        })
        .error(function (data, status, header, config) {

            response._errorFn(data, status, headers, config);

            $log.warn(data, status, header, config);
        });

        return response;
    };

    return {
        get: function (resource, parameters) {

            return request('GET', resource, null, parameters);
        },

        post: function (resource, entity) {

            return request('POST', resource, entity, null);
        },

        put: function (resource, entity) {

            return request('PUT', resource, entity, null);
        },

        remove: function (resource, entity) {

            return request('DELETE', resource, entity, null);
        }
    };
} ]);
 