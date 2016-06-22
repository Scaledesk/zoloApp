appControllers.controller('ForgetPwdPdpCtrl', function ($scope, $timeout, $mdUtil,forgetPasswordService,
                                                     $state,$stateParams,$cordovaNetwork,$rootScope) {
  

    $scope.user = {};

    forgetPasswordData = function () {
        data = {
            "email": $scope.user.email
        }
    };

    if($cordovaNetwork.isOnline() == true){
        $scope.online = true;
    }
    else{
        $scope.online = false;
    }

    $scope.try_again = function(){
        $rootScope.$broadcast('loading:show');
        if($cordovaNetwork.isOnline() == true){
            $scope.online = true;
            $rootScope.$broadcast('loading:hide');
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
    
    $scope.submit_forget_pwd = function(){
        forgetPasswordData();
        forgetPasswordService.forget_password(data).then(function(data){
            console.log("dddddddddddddddd",JSON.stringify(data));
        })
    };
    
    $scope.pdp_login = function(){
        $state.go('app.login_pdp',{'cat_id':$stateParams.cat_id,'product_id':$stateParams.product_id});

    };
    
}); 

