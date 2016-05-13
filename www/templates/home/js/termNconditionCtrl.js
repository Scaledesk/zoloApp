appControllers.controller('termNconditionCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                          $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        console.log("sonama",JSON.stringify($scope.package));
    });
});
