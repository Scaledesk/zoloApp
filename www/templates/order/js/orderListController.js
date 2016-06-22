appControllers.controller('oderListCtrl', function ($scope,orderListService, $ionicHistory,$stateParams,$rootScope,
                                                    $state,$stateParams,$cordovaNetwork) {
var access_token = window.localStorage['access_token'];

    if(access_token && access_token != 'undefined'){
        orderListService.get_order(access_token).then(function(data){
            $scope.order_list = data.data.data;
        });
    }
    $scope.order_detail = function(order_id){
        $state.go('app.order_detail',{order_id:order_id})
    }

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
            if(access_token && access_token != 'undefined'){
                orderListService.get_order(access_token).then(function(data){
                    $scope.order_list = data.data.data;
                });
            }
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };

    $scope.go_home = function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.home');
    };
});


