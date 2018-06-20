(function () {
    "use strict";

    function ProtectedTrueFalseController($scope, JaywingProtectedTrueFalseResources) {

        checkIfAuthorised();

        if ($scope.readonly)
            setupViewModel();

        function checkIfAuthorised() {
            JaywingProtectedTrueFalseResources.IsAuthorised()
                .then(function (response) {
                    console.log("protectedTrueFalse: " + response);
                    $scope.readonly = (response == 'true') ? false : true;
                    return;
                });

            $scope.readonly = true;
        }

        function setupViewModel() {

            $scope.renderModel = { value: false };

            if ($scope.model.config && $scope.model.config.default && $scope.model.config.default.toString() === "1" && $scope.model && !$scope.model.value) {
                $scope.renderModel.value = true;
            }

            if ($scope.model && $scope.model.value && ($scope.model.value.toString() === "1" || angular.lowercase($scope.model.value) === "true")) {
                $scope.renderModel.value = true;
            }
        }

        $scope.$watch("renderModel.value", function (newVal) {
            $scope.model.value = newVal === true ? "1" : "0";
        });
             
        $scope.model.onValueChanged = function (newVal, oldVal) {          
            setupViewModel();
        };
    }

    angular.module('umbraco').controller("Jaywing.ProtectedTrueFalse.Controller", ProtectedTrueFalseController);
})();