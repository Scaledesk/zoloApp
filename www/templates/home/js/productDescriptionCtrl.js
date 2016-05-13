appControllers.controller('productDescriptionCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                    $mdSidenav, $log, $ionicHistory, $state,$stateParams,SellerProfileService) {
    $scope.toggleLeft = buildToggler('right');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };
    
    $scope.max_length = 100;
    
    $scope.navigateTo = function (stateName,id) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName,{'sub_cat_id':id});
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        console.log("sonama",JSON.stringify($scope.package));
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });
    
    $scope.package_summary = function(id){
        $state.go('app.terms_n_cond',{product_id:id});
    };
    $scope.full_desc = function(id){
        $state.go('app.full_description',{product_id:id});
    };

    $scope.term_n_condition = function(id){
        $state.go('app.term_n_condition',{product_id:id});
    };
});
