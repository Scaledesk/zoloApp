appControllers.controller('optionalCtrl', function ($scope,$stateParams, $timeout,  $state, $auth, $mdToast,$http,signUpService,
                                                 serverConfig,$rootScope,$location,$ionicHistory,$ionicViewSwitcher,$ionicModal,
$cordovaOauth, $http,ProfileService) {
//
//     var device = $cordovaDevice.getDevice();
// console.log("device",JSON.stringify(device));
//
//     $ionicHistory.nextViewOptions({
//         disableBack: true
//     });

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
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $location.path(path);
    };
    

    $scope.get_token = function(user){
        $auth.login(user)
            .then(function (response) {
                console.log("resopnse",JSON.stringify(response));
                return;
                $scope.login_text = 'Sign In';
                $scope.disabled = false;


                ProfileService.get_profile_info(response.access_token).then(function (data) {

                    console.log("dataaaaa",JSON.stringify(data))
                    $rootScope.user_profile = data.data.data;
                    console.log(data.data.data.is_seller==="1");
                    if(data.data.data.is_seller==="1"){
                        window.localStorage['is_seller'] = "seller";
                    }else{
                        window.localStorage['is_seller'] = "buyer";
                    }
                    window.localStorage['user_id'] = data.data.data.user_id;
                    console.log($rootScope.user_profile);
                    
                });
            })
            .catch(function (response) {
                console.log("response in fail",JSON.stringify(response));
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
                $scope.disabled = false;
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
            console.log(JSON.stringify(result));
            var dh = 'facebook';
            $scope.demo(dh);
            // $scope.displayData($http, result.access_token);
            // console.log("result",JSON.stringify(result));


        },  function(error){
            alert("Error: " + error);
        });
    };

    $scope.googleLogin = function() {
        $cordovaOauth.google("936213911318-1mnllojl5hqu2b4o17e47hpbk2e4s66c.apps.googleusercontent.com",
            ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
            var url = 'https://www.googleapis.com/plus/v1/people/me?access_token='+result.access_token;

            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                success: function(userInfo) {
                    //info about user
                    console.log("result",JSON.stringify(userInfo));
                    console.log('test',JSON.stringify(userInfo.emails[0].value));
                    var user = {
                        google_id: userInfo.id,
                        google_access_token: result.access_token,
                        grant_type: "google",
                        client_id: "client_1",
                        client_secret: "client_secret"
                    };
                    $auth.authenticate('google',device.uuid,device.manufacturer).then(function(response){
                        console.log("authhhh res",JSON.stringify(response));
                    });
                    // $scope.get_token(user);
                },
                error: function(e) {
                    console.log('error');

                }
            });


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
                var user = {
                    google_id: response.data.google_id,
                    google_access_token: response.data.google_access_token,
                    grant_type: "google",
                    client_id: "client_1",
                    client_secret: "client_secret"
                };
                $scope.get_token(user);
            }).catch(function (response) {
            console.log("else",JSON.stringify(response));
        });
    };


    $scope.forget_pwd = function(){
        $state.go('app.forget_password');
    };

    $scope.demo = function(provider){
        console.log("inside demo");
        $auth.authenticate(provider).then(function (result) {
            console.log("sahgsdfs",JSON.stringify(result));
            // $scope.get_token({
            //     google_id:result.data.google_id,
            //     google_access_token:result.data.google_access_token,
            //     grant_type:"google",
            //     client_id:"client_id",
            //     client_secret:"client_secret",
            // });
        }).catch(function (e) {
            console.log(JSON.stringify(e));
        });
    };

});
