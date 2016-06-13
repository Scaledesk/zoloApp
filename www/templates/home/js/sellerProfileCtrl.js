appControllers.controller('sellerProfileCtrl', function ($scope,productService,SellerProfileService, $state,$stateParams) {

    console.log("1",$stateParams.product_id)
    console.log("1",$stateParams.cat_id)

    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        console.log("aaaaaaaaaaaaa",JSON.stringify($scope.package))
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
                // console.log("aa",JSON.stringify($scope.seller_info));
            });
        }
    });
});

