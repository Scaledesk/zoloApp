appControllers.controller('productDescriptionCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                    $mdSidenav, $log, $ionicHistory, $state,$stateParams,SellerProfileService) {
    $scope.des_value = true;
    $scope.pec_value = false;
    $scope.term_n_cond = false;
    
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });
    
    // $scope.package_summary = function(id){
    //     $state.go('app.terms_n_cond',{product_id:id});
    // };
    $scope.description_value = function () {
        $scope.des_value = true;
        $scope.pec_value = false;
        $scope.term_n_cond = false;
    };
    $scope.term_n_condition = function () {
        $scope.des_value = false;
        $scope.pec_value = false;
        $scope.term_n_cond = true;
    };
    $scope.full_desc = function(id){
        $state.go('app.full_description',{product_id:id});
    };
    $scope.package_summary = function(){
        $scope.des_value = false;
        $scope.pec_value = true;
        $scope.term_n_cond = false;
    };

    $scope.seller_Profile = function(id){
        $state.go('app.seller_profile',{product_id:id});
    };
});
