appControllers.controller('optionalCtrl', function ($scope,$stateParams, $timeout,  $state, $auth, $mdToast,$http,signUpService,
                                                 serverConfig,$rootScope,$location,$ionicHistory,$ionicViewSwitcher,$ionicModal) {
    $scope.navigateTo = function (stateName) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            $ionicViewSwitcher.nextDirection('back');

            $state.go(stateName, {
                isAnimated: objectData,
            });
        }
    };
    $scope.login_modal = function(){
    $state.go('app.login_index');
        $scope.modal.show();

    };


    $ionicModal.fromTemplateUrl('templates/login_signUp/html/login_modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openPictureModel = function () {
        // $scope.value = dataValue;
        $scope.modal.show();
    };
    $scope.closePictureModel = function () {
        $scope.modal.hide();
    };

    $scope.back_page = function(){
        console.log("ddddddddddddd")
        $state.go('app.optional_index');
        $scope.modal.hide();
    };
    
    $scope.sign_in_value = 'sign_in';

    $scope.sign_in = function(){
        $scope.sign_in_value = 'sign_in';
        $scope.sign_up_value = '';
    };
    $scope.sign_up = function(){
        $scope.sign_up_value = 'sign_up';

    };

    $scope.user = {};
    $scope.goto=function(path){
        console.log("goto:"+path);
        $location.path(path);
    };
    $scope.login = function () {
        console.log($scope.user);

        if ($scope.user.email == undefined || $scope.user.email == '') {
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Please Enter Email'
                    }
                }
            });
            return;
        }
        if ($scope.user.password == undefined || $scope.user.password == '') {
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Please Enter Password'
                    }
                }
            });
            return;
        }
        if ($scope.user.email != undefined) {
            if ($scope.user.email.indexOf("@") == -1 || $scope.user.email.indexOf(".") == -1) {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Please Enter a valid Email'
                        }
                    }
                });
                return;
            }
        }
        $scope.user.username = $scope.user.email;
        $scope.user.grant_type = "password";
        $scope.user.client_id = "client_1";
        $scope.user.client_secret = "client_secret";
        $scope.login_text = 'Please Wait...';
        $scope.disabled = true;
        $scope.get_token($scope.user);
    };
    $scope.get_token = function(user){
        $auth.login(user)
            .then(function (response) {
                console.log("response",JSON.stringify(response))
                if(response.status == '200'){
                    window.localStorage['access_token']=response.data.access_token;
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 800,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: 'Logged in successfully.'
                            }
                        }
                    });
                    $state.go('app.home');
                }
                // $scope.navigateTo("app.packages",true);
                //$location.path('app/dashboard')
            })
            .catch(function (response) {
                console.log("Inside invalid credentials");
                window.localStorage['access_token']=undefined;
                $auth.logout();
                // $scope.navigateTo("app.packages",true);
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Invalid Credentials'
                        }
                    }
                });
            });
    };

    $scope.forget_pwd = function(){
        $state.go('app.forget_password');
    }
});// End of Notes List Page  Controller.
