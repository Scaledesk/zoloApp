appControllers.controller('packageSummaryCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                              $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    $scope.toggleLeft = buildToggler('right');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        console.log("sonama",JSON.stringify($scope.package));
    });
});

