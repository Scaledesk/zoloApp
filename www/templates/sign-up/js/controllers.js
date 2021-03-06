
appControllers.controller('signUpController', function ($scope,$stateParams, $timeout, signUpService, $state, $auth,
                                                        $mdToast,$http, serverConfig,$rootScope,$location,$ionicHistory,
                                                        $ionicViewSwitcher) {
    $scope.navigateTo = function (stateName,objectData) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');

            $state.go(stateName, {
                isAnimated: objectData,
            });
        }
    };
    $scope.user = {};
    $scope.goto=function(path){
        console.log("goto:"+path);
        $location.path(path);
    };

    signUpData = function () {
        data = {
            "email": $scope.user.email,
            "mobile": $scope.user.mobile,
            "name": $scope.user.name,
            "password": $scope.user.password,
            "password_confirmation": $scope.user.password,
        }
        console.log("dataaa",JSON.stringify(data))
    };



    $scope.signUp = function () {
        signUpData();
        if(($scope.user.name)&&($scope.user.email)&&($scope.user.mobile)&&($scope.user.password)){
            console.log("all field",($scope.user.mobile.toString().length) ,$scope.user.password.length );
            if(($scope.user.mobile.toString().length == 10) && ($scope.user.password.length == 6)){
                signUpService.signUp(data).then(function (data) {
                    $scope.credentials = data;
                    console.log("sign up",JSON.stringify($scope.credentials));
                });
            }
            else{
                console.log("bed password n mobile")
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Password should have 6 characters at-least and mobile should have 10 digits!'
                        }
                    }
                });
            }
        }
        else{
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Please, fill above required fields!'
                    }
                }
            });
            console.log("name required");
        }

    };
});
