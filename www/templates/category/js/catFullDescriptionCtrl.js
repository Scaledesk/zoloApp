appControllers.controller('catFullDescriptionCtrl', function ($scope,productService, $state,$stateParams,$rootScope,
                                                              $cordovaNetwork) {


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
            });
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
   
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
    });

    $scope.back_to_cat_pdp = function () {
        $state.go('app.cat_product_desc',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id})
    };
});

