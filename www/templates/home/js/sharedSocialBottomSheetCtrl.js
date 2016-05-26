appControllers.controller('sharedSocialBottomSheetCtrl', function ($scope, $mdBottomSheet, $timeout,
                                                                   $mdToast, $cordovaSocialSharing) {

    $scope.name = 'sonam';
    $scope.sharedFacebook = function () {
        $cordovaSocialSharing.shareViaFacebook('hi sonam this side',null, 'https://www.thepolyglotdeveloper.com').then(function(result) {
            console.log("result",JSON.stringify(result))
        }, function(err) {
            console.log("err",JSON.stringify(err))

            // An error occurred. Show a message to the user
        });;
        $mdBottomSheet.hide();
    };


    $scope.sharedTwitter = function () {
        $cordovaSocialSharing.shareViaTwitter("hi sonam this side");
        $mdBottomSheet.hide();
    };
    $scope.sharedMail = function () {
        $cordovaSocialSharing.shareViaEmail(" ", "Shopping with ionic meterial", "ionicmaterialdesign@gmail.com", "cc@IonicMeterial.com", "bcc@IonicMeterial.com");
        $mdBottomSheet.hide();
    };
    $scope.sharedMore = function () {

        $mdBottomSheet.hide();
    };
    
    $scope.sharedWhatsApp = function(){
        $cordovaSocialSharing
            .shareViaWhatsApp("hi sonam this side")
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occurred. Show a message to the user
            });
    }
});
