
mobileApp.factory("uploadService",[ 'memberShip', function (memberShip) {
    return {
        uploadImage: function (file) {

            var fd = new FormData(), xmlrequest = new XMLHttpRequest();

            fd.append("displayPic", file);

            var isAsync = false;

            xmlrequest.open("POST", memberShip.getHostServer + "Uploader/UploadImage", isAsync);

            var pathForImage = "";

            xmlrequest.onload = function () {
                if (xmlrequest.status == 200) {
                    pathForImage = xmlrequest.responseText;
                }
            };

            xmlrequest.send(fd);

            return pathForImage;
        },

        replaceEmptyImage: function (array) {

            for (var i = 0; i < array.length; i++) {

                if ('Screenshot' in array[i]) {
                    if (array[i].Screenshot == "" || array[i].Screenshot == null) {
                        array[i].Screenshot = "/icons/no_picture.png";
                    }
                }

                if ('Avatar' in array[i]) {
                    if (array[i].Avatar == "" || array[i].Avatar == null) {
                        array[i].Avatar = "/icons/no_picture.png";
                    }
                }
            }
        },

        replaceEmptyImageRound: function (array) {

            for (var i = 0; i < array.length; i++) {
                if ('Screenshot' in array[i]) {
                    if (array[i].Screenshot == "" || array[i].Screenshot == null) {
                        array[i].Screenshot = "/icons/noavatar-round.png";
                    }
                }

                if ('Avatar' in array[i]) {
                    if (array[i].Avatar == "" || array[i].Avatar == null) {
                        array[i].Avatar = "/icons/noavatar-round.png";
                    }
                }
            }
        }

    };
}]);