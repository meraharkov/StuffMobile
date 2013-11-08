var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
        angular.element(document).ready(function() {
            angular.bootstrap(document);
        });
    }
};


var mobileApp = angular.module("mobileApp", ['ui.bootstrap'])
    .config(['$compileProvider', '$httpProvider', function ($compileProvider, $httpProvider)
    {
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(['$routeProvider', function ($routeProvider) {

   $routeProvider
                .when('/', {
                    templateUrl: 'pages/login/loginpage.html',
                    controller: 'LoginController'
                })
                .when('/Stuffs', {
                    controller: 'StuffController',
                    templateUrl: '/pages/company/stuffs.html'
                })
                .otherwise(
                   '/', {
                         templateUrl: 'pages/login/loginpage.html',
                         controller: 'LoginController'
                            });
    } ]);


          