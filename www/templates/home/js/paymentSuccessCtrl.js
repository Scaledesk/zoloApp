appControllers.controller('paymentSuccessCtrl', function ($scope, $timeout, $mdUtil,$location,orderDetailService,
                                                       $mdSidenav,$stateParams, $log, $ionicHistory, $state,$stateParams) {

    var booking_id = $stateParams.b_id;

    console.log("gvsgv",booking_id);

    orderDetailService.get_order_detail(booking_id).then(function(data){
        console.log("detail",JSON.stringify(data));
        $scope.order_detail = data.data.data;

        $scope.total_price = $scope.order_detail.deal_price;
        angular.forEach($scope.order_detail.bookingPackagesAddons.data, function (value, key) {
            $scope.total_price = parseInt($scope.total_price) + parseInt(value.amount);
        });
    })

});



