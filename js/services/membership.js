
//mobileApp.factory('memberShip', ['$scope', function ($scope) {
mobileApp.factory('memberShip', ['$http', '$log', '$scope', function ($http, $log, $scope) {
    
    $scope.Authentication = false;

    $scope.UserProfile = { Username: "", CompanyId: "" };

    return {
        getHostServer: function () {
            return "http://localhost:51933/";
        },

        isAuthenticated: function () {
            return $scope.Authentication;
        },

        setAuthentication: function (userInfo) {

            if (userInfo.Username) {
                $scope.Authentication = true;

            }

            $scope.UserProfile.Username = userInfo.Username;
            $scope.UserProfile.CompanyId = userInfo.CompanyId;
        },

        getUserProfile: function () {
            return $scope.UserProfil;
        }
    };
} ]);