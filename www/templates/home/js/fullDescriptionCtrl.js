appControllers.controller('fullDescriptionCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                          $mdSidenav, $log, $ionicHistory, $state,$stateParams) {

    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
    });
});

