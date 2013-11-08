
mobileApp.factory("stuffsService", ['$q', 'serverApi', function ($q, serverApi) {
    return {
        getStuffs: function (companyid, successResponce) {

            var parametrRequest = { companyId: companyid };

            serverApi
                .get("stuff/GetStuffsByCompanyId", parametrRequest)
                .success(function (stuffs) {
                    successResponce(stuffs);
                });
        },

        addNewStuff: function (stuff, successResponse) {

            serverApi
                .put("stuff", stuff)
                .success(function (idCv) {
                    successResponse(idCv);
                });
        },

        updateStuff: function (stuff, successResponse) {

            serverApi
                .post("stuff", stuff)
                .success(function (responce) {
                    successResponse(responce);
                });
        },

        deleteStuff: function (stuff, successResponse) {

            serverApi
                .remove("stuff", stuff)
                .success(function (responce) {
                    successResponse(responce);
                });
        },

        getStuffsSync: function () {

            var deferred = $q.defer();

            serverApi
                .get("stuff")
                .success(function (stuffs) {

                    deferred.resolve(stuffs);
                });

            return deferred.promise;
        }
    };
} ]);