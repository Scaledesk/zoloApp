appControllers.controller('paymentSuccessCtrl', function ($scope, $timeout, $mdUtil,$location,orderDetailService,$rootScope,
                                                       $mdSidenav,$stateParams, $cordovaNetwork, $ionicHistory, $state,$stateParams) {

    var booking_id = $stateParams.b_id;


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
            orderDetailService.get_order_detail(booking_id).then(function(data){
                $scope.order_detail = data.data.data;
                $scope.total_price = $scope.order_detail.deal_price;
                angular.forEach($scope.order_detail.bookingPackagesAddons.data, function (value, key) {
                    $scope.total_price = parseInt($scope.total_price) + parseInt(value.amount);
                });
            })
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
    orderDetailService.get_order_detail(booking_id).then(function(data){
        $scope.order_detail = data.data.data;
        $scope.total_price = $scope.order_detail.deal_price;
        angular.forEach($scope.order_detail.bookingPackagesAddons.data, function (value, key) {
            $scope.total_price = parseInt($scope.total_price) + parseInt(value.amount);
        });
    })

});



