
//mobileApp.controller("LoginController", ['$scope',  'loginService', function LoginController($scope, loginService, memberShip ) {

mobileApp.controller("LoginController", ['$scope', 'loginService', function CompanyController($scope, loginService) {

    $scope.login = "some login";

    $scope.messageRequest = "nothing";

    $scope.password = "some password";

    $scope.loginUser = function () {

        var registerModel = { LoginName: $scope.login, Password: $scope.password };

        loginService.loginOnServer(registerModel, function (response) {

            // memberShip.setAuthentication(response);
            //            if (memberShip.isAuthenticated === true) {
            // }

        });
    };

    $scope.logoffUser = function () {
        //        loginService.logOut(function (response) {
        //        }
        //      );
    };

    $scope.put = function () {

        loginService.putRequest(function (request) {

            $scope.messageRequest = "PUT: " + request;
            $scope.$apply();
        });
    };

    $scope.remove = function () {

        loginService.deleteRequst(function (request) {

            $scope.messageRequest = "DELETE: " + request;
            $scope.$apply();
        });
    };

    $scope.post = function () {

        loginService.postRequest(function (request) {

            $scope.messageRequest = "POST: " + " id:" + request.Id + " Desc: " + request.Desc;
            $scope.$apply();
        });
    };

    $scope.get = function () {
        loginService.getRequest(function (request) {

            $scope.messageRequest = "GET: " + request;
            $scope.$apply();
        });
    };


} ]);