// appControllers.controller('loginCtrl', function ($scope, $timeout, $mdUtil,loginService,
//                                                     $mdSidenav, $log, $ionicHistory, $state) {
//     $scope.user_login_info = {};
//
//     $scope.toggleLeft = buildToggler('right');
//     function buildToggler(navID) {
//         var debounceFn = $mdUtil.debounce(function () {
//             $mdSidenav(navID).toggle();
//         }, 0);
//         return debounceFn;
//     };
//     $scope.navigateTo = function (stateName) {
//         $timeout(function () {
//             $mdSidenav('left').close();
//             if ($ionicHistory.currentStateName() != stateName) {
//                 $ionicHistory.nextViewOptions({
//                     disableAnimate: true,
//                     disableBack: true
//                 });
//                 $state.go(stateName);
//             }
//         }, ($scope.isAndroid == false ? 300 : 0));
//     };
//
//     $scope.sign_in_value = 'sign_in';
//
//     $scope.sign_in = function(){
//        $scope.sign_in_value = 'sign_in';
//         $scope.sign_up_value = '';
//     };
//     $scope.sign_up = function(){
//         $scope.sign_up_value = 'sign_up';
//
//     };
//    
//     loginData = function () {
//         data = {
//             "username": $scope.user_login_info.email,
//             "password": $scope.user_login_info.password,
//             "client_id": "client_1",
//             "client_secret": "client_secret",
//             "grant_type": "password",
//         }
//     }
//     $scope.login = function () {
//         loginData();
//         return loginService.login(data).then(function (response_from_server) {
//             $scope.credentials = response_from_server;
//
//             console.log("wwwwwwwww",JSON.stringify($scope.credentials));
//         });
//     };
// });


// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
appControllers.controller('loginCtrl', function ($scope,$stateParams, $timeout,  $state, $auth, $mdToast,$http,signUpService,
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
