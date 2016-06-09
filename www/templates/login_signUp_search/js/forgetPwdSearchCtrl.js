appControllers.controller('ForgetPwdSearchCtrl', function ($scope, $timeout, $mdUtil,forgetPasswordService,
                                                     $state,$stateParams) {
  

    $scope.user = {};

    forgetPasswordData = function () {
        data = {
            "email": $scope.user.email
        }
    };

    $scope.submit_forget_pwd = function(){
        forgetPasswordData();
        forgetPasswordService.forget_password(data).then(function(data){
            console.log("dddddddddddddddd",JSON.stringify(data));
        })
    };
    
    $scope.search_login = function(){
        $state.go('app.login_search',{'search_text': $stateParams.search_text,'cat_id': $stateParams.cat_id,'product_id':$stateParams.product_id});

    };
    
}); 

