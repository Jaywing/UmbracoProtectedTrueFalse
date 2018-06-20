(function () {
    'use strict';

    function JaywingProtectedTrueFalseResources($http, umbRequestHelper) {

        function IsAuthorised() {
            return umbRequestHelper.resourcePromise(
                $http.get("/umbraco/backoffice/Jaywing/ProtectedTrueFalseApi/IsAuthorised"),
                'Failed to check authorisation');
        }      

        var resource = { IsAuthorised: IsAuthorised };
        return resource;
    }

    angular.module('umbraco.resources').factory('JaywingProtectedTrueFalseResources', JaywingProtectedTrueFalseResources);
})();