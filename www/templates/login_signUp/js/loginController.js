appControllers.controller('optionalLoginCtrl', function ($scope,$stateParams, $timeout,  $state, $auth, $mdToast,$http,signUpService,
                                                    serverConfig,$rootScope,$location,$ionicHistory,$ionicViewSwitcher,$ionicModal) {

    $scope.user = {};

    $scope.goto=function(path){
        console.log("goto:"+path);
        $location.path(path);
    };
    var page_to_be_on = window.localStorage['orp_page'];
    var product_id = window.localStorage['pro_id'];
  
    $scope.login = function () {
        console.log("in side login function")
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
                console.log("response",JSON.stringify(response));
                
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
                    $scope.user.email = '';
                    $scope.user.password = '';
                    if(page_to_be_on == 'true'){
                        $state.go('app.product_desc',{'product_id':product_id});
                    }
                    else{
                        $state.go('app.home');
                    }

                }
            })
            .catch(function (response) {
                console.log("Inside invalid credentials");
                window.localStorage['access_token']=undefined;
                $auth.logout();
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
});
