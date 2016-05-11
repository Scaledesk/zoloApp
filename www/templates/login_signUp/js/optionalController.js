appControllers.controller('optionalCtrl', function ($scope,$stateParams, $timeout,  $state, $auth, $mdToast,$http,signUpService,
                                                 serverConfig,$rootScope,$location,$ionicHistory,$ionicViewSwitcher,$ionicModal,
$cordovaOauth, $http) {
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
    $scope.login_page = function(){
    $state.go('app.login_index');
    };
    
    $scope.sign_up_page = function(){
        $state.go('app.signUp_index');
    };

    $scope.back_page = function(){
        $state.go('app.optional_index');
    };
    

    $scope.user = {};
    $scope.goto=function(path){
        console.log("goto:"+path);
        $location.path(path);
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



        window.cordovaOauth = $cordovaOauth;
        window.http = $http;

    $scope.demo_fb = function()
    {
        $scope.facebookLogin(window.cordovaOauth, window.http);
    };

    $scope.facebookLogin = function($cordovaOauth, $http)
    {
        $cordovaOauth.facebook("1604761699851791", ["email", "public_profile"],
            {redirect_uri: "http://localhost/callback"}).then(function(result){
            $scope.displayData($http, result.access_token);
        },  function(error){
            alert("Error: " + error);
        });
    }

    $scope.demo_Gplus = function()
    {
        $state.go('app.googlePlusLogin');
    };


    $scope.googleLogin = function() {
        $cordovaOauth.google("936213911318-1mnllojl5hqu2b4o17e47hpbk2e4s66c.apps.googleusercontent.com",
            ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    };
    
  $scope.displayData = function($http, access_token)
    {
        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
            var name = result.data.name;
            var gender = result.data.gender;
            var picture = result.data.picture;
            console.log("suussssssssssssssssss",JSON.stringify(name),JSON.stringify(gender),JSON.stringify(picture))
        }, function(error) {
            alert("Error: " + error);
        });
    };

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider)
            .then(function (response) {
                console.log("here");
                console.log("if",JSON.stringify(response));
                var user = {
                    google_id: response.data.google_id,
                    google_access_token: response.data.google_access_token,
                    grant_type: "google",
                    "client_id": "client_1",
                    "client_secret": "client_secret"
                };
                $scope.get_token(user);
            }).catch(function (response) {
            console.log("else",JSON.stringify(response));
        });
    };


    $scope.forget_pwd = function(){
        $state.go('app.forget_password');
    };
});
