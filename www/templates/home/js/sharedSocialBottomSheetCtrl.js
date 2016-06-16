appControllers.controller('sharedSocialBottomSheetCtrl', function ($scope, $mdBottomSheet, $timeout,slug_url,image,
                                                                   $mdToast, $cordovaSocialSharing,name) {

    $scope.url = 'www.imzolo.com/package/'+slug_url;
    $scope.sharedFacebook = function () {
        $cordovaSocialSharing.shareViaFacebook(name,null,$scope.url).then(function(result) {
            console.log("result",JSON.stringify(result))
        }, function(err) {
            window.open("https://www.facebook.com/", "_blank", "location=yes");
            console.log("err",JSON.stringify(err))

        });
        $mdBottomSheet.hide();
    };


    $scope.sharedTwitter = function () {
        $cordovaSocialSharing.shareViaTwitter(name+' @Zolo_Official',image, $scope.url).then(function(result) {
            console.log("result",JSON.stringify(result))
        }, function(err) {
            window.open("https://twitter.com/", "_blank", "location=yes");
            console.log("err",JSON.stringify(err))

            // An error occurred. Show a message to the user
        });
        $mdBottomSheet.hide();
    };
    
    $scope.more = function(){
        $cordovaSocialSharing
            .share(name+' @Zolo_Official', "Find this package on zolo "+ $scope.url, image, $scope.url) // Share via native share sheet
            .then(function(result) {
                // Success!
                console.log("result",JSON.stringify(result))

            }, function(err) {
                console.log("err",JSON.stringify(err))

                // An error occured. Show a message to the user
            });

        $mdBottomSheet.hide();

    };
    $scope.sharedMail = function () {
        $cordovaSocialSharing.shareViaEmail(name, "Find this package on zolo "+ $scope.url, null,null,null,image);
        $mdBottomSheet.hide();
    };
    $scope.sharedMore = function () {

        $mdBottomSheet.hide();
    };
    
    $scope.sharedWhatsApp = function(){
        $cordovaSocialSharing
            .shareViaWhatsApp(name,image, $scope.url)
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occurred. Show a message to the user
            });
    }
});
