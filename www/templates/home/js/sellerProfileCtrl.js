appControllers.controller('sellerProfileCtrl', function ($scope,productService,SellerProfileService,$rootScope,
                                                         $state,$stateParams,$cordovaNetwork) {


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
            productService.getProductDescription($stateParams.product_id).then(function(data){
                $scope.package = data.data.data;
                if($scope.package.seller_profile.user_id){
                    SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                        $scope.seller_info = data.data.data;
                    });
                }
            });
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
   
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });

    $scope.back_to_pdp = function(){
        $state.go('app.product_desc',{'cat_id':$stateParams.cat_id,'product_id':$stateParams.product_id});
    };

    $scope.getPdp = function(category_id,p_id){
        $state.go('app.product_desc', {'cat_id':category_id,'product_id': p_id})
    };
});

