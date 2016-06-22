appControllers.controller('profileCtrl', function($scope,$cordovaNetwork,$rootScope,$state,$stateParams,profileService) {

    var access_token = window.localStorage['access_token'];

    if($cordovaNetwork.isOnline() == true){
        $scope.online = true;
    }
    else{
        $scope.online = false;
    }

    $scope.try_again = function(){
        $rootScope.$broadcast('loading:show');
        if($cordovaNetwork.isOnline() == true){
            $scope.online = true;
            $rootScope.$broadcast('loading:hide');
            profileService.get_profile(access_token).then(function(data){
                $scope.profile = data.data.data;
                console.log("my profile, data",JSON.stringify(data));
            });
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
    profileService.get_profile(access_token).then(function(data){
            $scope.profile = data.data.data;
            console.log("my profile, data",JSON.stringify(data));
        });
    
});

