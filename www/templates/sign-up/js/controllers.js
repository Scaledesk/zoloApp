// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
appControllers.controller('signUpController', function ($scope,$stateParams, $timeout, signUpService, $state, $auth, $mdToast,$http,
                                                        serverConfig,$rootScope,$location,$ionicHistory,$ionicViewSwitcher) {
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
    }; // End of navigateTo.
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
    }

    $scope.signUp = function () {
        alert('1')
        signUpData();
        if((!($scope.user.mobile)) || ($scope.user.mobile.length < 10) || ($scope.user.mobile.length > 10)){
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Please enter valid mobile number!'
                    }
                }
            });
        }
        else if((!($scope.user.password)) || ($scope.user.password.length < 6)){
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Password should have 6 characters at-least!'
                    }
                }
            });
        }
        else if(($scope.user.email) && ($scope.user.name)  && ($scope.user.mobile.length == 10) && (($scope.user.password.length == 6) || ($scope.user.password.length >6))){
            signUpService.signUp(data).then(function (data) {
                $scope.credentials = data;
                console.log("sign up",JSON.stringify($scope.credentials));
            });
        }
        else{
            console.log("sssssss")
            signUpService.signUp(data).then(function (data) {
                $scope.credentials = data;
                console.log("sign up",JSON.stringify($scope.credentials));
            });

        }

    };
});// End of Notes List Page  Controller.
