appControllers.controller('sellerProfileSearchCtrl', function ($scope,productService,SellerProfileService,$cordovaNetwork,
                                                           $ionicHistory, $state,$stateParams,$rootScope) {


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
    
    $scope.back_to_search_pdp = function () {
        $state.go('app.search_pdp',{'search_text': $stateParams.search_text,'cat_id': $stateParams.cat_id,'product_id':$stateParams.product_id})
    };

    $scope.getPdpForSearch = function(cat_id,product_id){
        $state.go('app.search_pdp',{'search_text': $stateParams.search_text,'cat_id':cat_id,'product_id':product_id})

    };
});

