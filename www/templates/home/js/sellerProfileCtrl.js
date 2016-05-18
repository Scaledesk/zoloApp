appControllers.controller('sellerProfileCtrl', function ($scope, $timeout, $mdUtil,productService,SellerProfileService,
                                                           $mdSidenav, $log, $ionicHistory, $state,$stateParams) {

    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });
});
