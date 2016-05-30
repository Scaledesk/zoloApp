appControllers.controller('MenuCtrl', function($scope,$ionicPopup,$mdToast,$state,
                                               $ionicSideMenuDelegate,$window) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    // $scope.$on('logout', function (event, args) {
    //  $state.go('app.home');
    // });
    $scope.access_token = window.localStorage['access_token'];
    console.log("dddd",$scope.access_token);

    $scope.logOut = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure ?',
            template: 'You want to logOut.'
        });
        confirmPopup.then(function(res) {
            if(res) {
                window.localStorage['access_token'] ='';
                // $window.location.reload();
                $state.reload('app.home');
                // $scope.$broadcast('logout', {message: 'log out'});
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Logged out successfully.'
                        }
                    }
                });
            }
            else {
                console.log('You are not sure');
            }
        });
    }
});

