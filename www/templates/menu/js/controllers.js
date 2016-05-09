appControllers.controller('menuCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,
                                                $auth,$rootScope,$http,serverConfig) {
    console.log("inside menu controller");
    if($auth.isAuthenticated()){
        $http({
            method: 'GET',
            url: serverConfig.address+'api/myProfile?access_token='+window.localStorage['access_token']
        }).then(function(data){
            $scope.user_profile=data.data.data;
            console.log("authenticated");
        },function(response){
            if(response.status == 500){
                window.localStorage['access_token']=undefined
                $auth.logout();
            }
        });
    }else{
        $scope.user_profile=undefined;
        window.localStorage['access_token']=undefined
        console.log("unauthenticated");
    }

    $scope.toggleLeft = buildToggler('right');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };
    $scope.navigateTo = function (stateName) {
        
        console.log(stateName);
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                });
            }
            console.log("1",stateName);

            $state.go(stateName);
            $mdSidenav('right').toggle();
        }, ($scope.isAndroid == false ? 300 : 0));
    };
});