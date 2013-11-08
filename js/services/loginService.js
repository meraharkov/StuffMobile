
mobileApp.factory('loginService', ['$http', '$log', function ($http, $log) {


    return {

        loginOnServer: function (loginModel, responce) {


            var url = "http://localhost:51933/Account/LoginMobile/"; // +"/post?callback=jsonp_callback";

            //            $.getJSON(url, loginModel, function (data, textStatus, jqXHR) {
            //                responce(data, textStatus, jqXHR);
            //            });


            $.ajax({
                type: "POST",
                data: loginModel,
                url: url,
                dataType: "json",
                success: function (result) {
                    $log.warn(result);
                    responce(result);
                },
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                }
            });

        },

        logOut: function (responce) {
            $http({
                method: "POST",
                url: "http://localhost:51933/" + "Account/LogOffMobile/",
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function (data, status, headers, config) {
                return response(data);
            })
            .error(function (data, status, header, config) {
                return response(data);
                $log.warn(data, status, header, config);
            });
        },

        postRequest: function (responce) {

            var url = "http://localhost:51933/api/Mobile";

            $.ajax({
                type: "POST",
                data: {},
                url: url,
                dataType: "json",
                success: function (result) {
                    $log.warn(result);
                    responce(result);
                },
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                }
            });
        },

        putRequest: function (responce) {

            var url = "http://localhost:51933/api/Mobile";

            $.ajax({
                type: "PUT",
                data: {},
                url: url,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    $log.warn(result);
                    responce(result);
                },
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                }
            });
        },

        deleteRequst: function (responce) {

            var url = "http://localhost:51933/api/Mobile";

            $.ajax({
                type: "DELETE",
                data: {},
                url: url,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    $log.warn(result);
                    responce(result);
                },
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                }
            });

        },

        getRequest: function (responce) {
            var url = "http://localhost:51933/api/Mobile";

            $.ajax({
                type: "GET",
                data: {},
                url: url,
                dataType: "json",
                success: function (result) {
                    $log.warn(result);
                    responce(result);
                },
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                }
            }); 
        }
    };
} ]);
 