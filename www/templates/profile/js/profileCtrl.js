appControllers.controller('profileCtrl', function($scope,$ionicPopup,$mdToast,$state,$stateParams,profileService) {

    var access_token = window.localStorage['access_token'];


    profileService.get_profile(access_token).then(function(data){
            $scope.profile = data.data.data;
            console.log("my profile, data",JSON.stringify(data));
        });
    
});

