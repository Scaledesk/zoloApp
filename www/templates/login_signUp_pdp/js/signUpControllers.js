
appControllers.controller('signUpPdpCtrl', function ($scope,$stateParams, $timeout, signUpService, $state, $auth,
                                                        $mdToast,$http, serverConfig,$rootScope,$location,$ionicHistory,
                                                        $ionicViewSwitcher) {

    $scope.product_id = window.localStorage['pro_id'];
    var c_id = window.localStorage['cat_id'];
    
    
    $scope.redirection = function (){
        $state.go('app.product_desc',{'cat_id':c_id,'product_id':$scope.product_id});
    };
    
    $scope.user = {};
    $scope.goto=function(path){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
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
    };



    $scope.signUp = function () {
        signUpData();
        if(($scope.user.name)&&($scope.user.email)&&($scope.user.mobile)&&($scope.user.password)){
            if(($scope.user.mobile.toString().length == 10) && ($scope.user.password.length == 6)){
                signUpService.signUp(data).then(function (data) {
                    $scope.credentials = data;
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.product_desc',{'cat_id':c_id,'product_id':$scope.product_id});
                });
            }
            else{
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
        }

    };
});
