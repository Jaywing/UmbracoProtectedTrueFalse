(function () {
    "use strict";

    function ProtectedTrueFalseController($scope, JaywingProtectedTrueFalseResources) {

        function checkIfAuthorised() {
            JaywingProtectedTrueFalseResources.IsAuthorised()
                .then(function (response) {
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

        $scope.model.onValueChanged = function (newVal, oldVal) {
            setupViewModel();
        };

        $scope.toggle = function () {
            if ($scope.renderModel.value) {
                $scope.model.value = "0";
                setupViewModel();
                return;
            }

            $scope.model.value = "1";
            setupViewModel();
        };

        checkIfAuthorised();

        if ($scope.readonly) {
            setupViewModel();         
        }

        if ($scope.model && !$scope.model.value) {
            $scope.model.value = ($scope.renderModel.value === true) ? '1' : '0';
        }
    }

    angular.module('umbraco').controller("Jaywing.ProtectedTrueFalse.Controller", ProtectedTrueFalseController);
})();