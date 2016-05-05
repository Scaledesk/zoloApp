appControllers.controller('productDescriptionCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                    $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    $scope.toggleLeft = buildToggler('right');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };
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
    });
});
