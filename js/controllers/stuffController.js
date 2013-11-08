
mobileApp.controller("StuffController", ['$scope', '$dialog', 'stuffsService', 'uploadService', 'memberShip', function StuffController($scope, $dialog, stuffsService, uploadService, memberShip ) {

    $scope.stuffs = null;

    $scope.companyId = null;

    $scope.currentPage = 1;

    $scope.pageInArray = 0;

    $scope.pagedItems = [];

    $scope.itemsPerPage = 4;

    $scope.maxSize = 7;

    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        $scope.pageInArray = page - 1;
        if ($scope.pageInArray < 0) {
            $scope.pageInArray = 0;
        }
    };

    $scope._dialogOptionsPortfolios = {

        controller: 'PortfolioController',
        templateUrl: '/Scripts/app/company/partialviews/Portfolios.html'
    };

    $scope.openPortfolios = function (stuff) {

        $dialog.dialog(angular.extend($scope._dialogOptionsPortfolios, { resolve: { stuff: stuff} }))
            .open();
    };

    $scope._dialogOptionsAddNewStuff = {

        controller: 'AddStuffController',
        templateUrl: '/Scripts/app/company/partialviews/AddNewStuff.html'
    };

    $scope.addNewStuff = function () {

      $dialog.dialog(angular.extend($scope._dialogOptionsAddNewStuff, { resolve: {} }))
      .open()
      .then(function (newStuff) {
          if (newStuff) {

              newStuff.CompanyId = $scope.companyId;

              stuffsService.addNewStuff(newStuff, function (responceId) {
                  newStuff.Id = responceId;
                  $scope.stuffs.push(newStuff);
                  $scope._groupToPages();
              });
          }
      });
    };

    $scope._dialogOptionsProfiles =
    {
        controller: 'ProfileController',
        templateUrl: '/Scripts/app/company/partialviews/Profiles.html'
    };

    $scope.openProfiles = function (stuff) {

        $dialog.dialog(angular.extend($scope._dialogOptionsProfiles, { resolve: { stuff: stuff} }))
            .open();
    };

    $scope._dialogOptionsEditStuff =
    {
        controller: 'EditStuffController',
        templateUrl: '/Scripts/app/company/partialviews/Editstuff.html'
    };

    $scope.editStuff = function (stuff) {

        var stuffToEdit = stuff;

        $dialog.dialog(angular.extend($scope._dialogOptionsEditStuff, { resolve: { stuffToEdit: angular.copy(stuffToEdit)} }))
      .open()
      .then(function (result) {
          if (result) {
              angular.copy(result, stuffToEdit);
              stuffsService.updateStuff(stuffToEdit, function () {

              });
          }
          stuffToEdit = undefined;
      });
    };

    $scope._dialogOptionsDeleteStuff =
    {
        controller: 'DeleteStuffController',
        templateUrl: '/Scripts/app/company/partialviews/DeleteStuff.html'
    };

    $scope.deleteStuff = function (stuff) {

        var stuffToDelete = stuff;

        $dialog.dialog(angular.extend($scope._dialogOptionsDeleteStuff, { resolve: { stuffToDelete: angular.copy(stuffToDelete)} }))
      .open()
      .then(function (result) {
          if (result) {
              stuffsService.deleteStuff(stuff, function (resp) {
                  var responce = resp;
                  if (responce == "") {
                      var indexStuff = $scope.stuffs.indexOf(stuff);
                      $scope.stuffs.splice(indexStuff, 1);
                      $scope._groupToPages();
                  }
              });
          }
          stuffToDelete = undefined;
      });
    };

    /* private    ============================================================================================================================*/

    // calculate page in place
    $scope._groupToPages = function () {

        $scope.pagedItems = [];

        for (var i = 0; i < $scope.stuffs.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.stuffs[i]];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.stuffs[i]);
            }
        }

        for (var j = 0; j < $scope.pagedItems.length; j++) {

            uploadService.replaceEmptyImageRound($scope.pagedItems[j]);
        }
    };

    $scope.initializeStuffController = function () {

        $scope.companyId = memberShip.getUserProfile().CompanyId;

        stuffsService.getStuffs($scope.companyId, function (stuffs) {

            $scope.stuffs = stuffs;
            $scope._groupToPages();
        });
    };

    /* initialize    ============================================================================================================================*/

    $scope.initializeStuffController();
} ]);


mobileApp.controller("AddStuffController", ['$scope', 'dialog', 'uploadService', function AddStuffController($scope, dialog, uploadService) {

    $scope.newStuff = { Id: "", FirstName: "", LastName: "", Avatar: "/content/images/design/popap/noavatar.png", Description: "", Profiles: "" };

    $scope.inputField = null;

    $scope.file = null;

    $scope.save = function () {

        if ($scope.newStuff.Avatar == "/content/images/design/popap/noavatar.png") {
            $scope.newStuff.Avatar = null;
        }

        dialog.close($scope.newStuff);
    };

    $scope.close = function () {

        dialog.close(undefined);
    };

    $scope.setFile = function (elem) {
        $scope.inputField = elem;
        $scope.file = elem.files[0];
        $scope.$apply($scope.uploadFile());
    };

    $scope.uploadFile = function () {

        var newPathForImage = uploadService.uploadImage($scope.file);

        if (newPathForImage != null && newPathForImage != "") {

            $scope.newStuff.Avatar = newPathForImage;
        }

        if ($scope.inputField !== null) {

            $scope.inputField.value = "";
        }
    };

} ]);

mobileApp.controller("EditStuffController", ['$scope', 'dialog', 'stuffToEdit', 'uploadService', function EditStuffController($scope, dialog, stuffToEdit, uploadService) {

    $scope.stuffToEdit = stuffToEdit;

    $scope.inputField = null;

    $scope.file = null;

    $scope.save = function () {
        $scope._replaceAvatar($scope.stuffToEdit);
        dialog.close($scope.stuffToEdit);
    };

    $scope.close = function () {

        $scope._replaceAvatar($scope.stuffToEdit);
        dialog.close(undefined);
    };

    $scope.setFile = function (elem) {

        $scope.inputField = elem;
        $scope.file = elem.files[0];
        $scope.$apply($scope.uploadFile());
    };

    $scope.uploadFile = function () {

        var newPathForImage = uploadService.uploadImage($scope.file);

        if (newPathForImage != null && newPathForImage != "") {

            $scope.stuffToEdit.Avatar = newPathForImage;
        }

        if ($scope.inputField !== null) {

            $scope.inputField.value = "";
        }
    };

    $scope._replaceRoundAvatar = function (stuffToEdit) {
        if (stuffToEdit.Avatar == "/Content/images/design/noavatar-round.png") {
            stuffToEdit.Avatar = "/content/images/design/popap/noavatar.png";
        }
    };

    $scope._replaceAvatar = function (stuffToEdit) {
        if (stuffToEdit.Avatar == "/content/images/design/popap/noavatar.png") {
            stuffToEdit.Avatar = "/Content/images/design/noavatar-round.png";
        }
    };

    $scope._replaceRoundAvatar($scope.stuffToEdit);

} ]);


mobileApp.controller("DeleteStuffController", ['$scope', 'dialog', 'stuffToDelete', function DeleteStuffController($scope, dialog, stuffToDelete) {

    $scope.stuff = stuffToDelete;

    $scope.deleteStuff = function () {

        dialog.close($scope.stuff);
    };

    $scope.close = function () {

        dialog.close(undefined);
    }; 
} ]);