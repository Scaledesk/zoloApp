appControllers.controller('oderListCtrl', function ($scope,orderListService, $timeout,$stateParams, $state,$stateParams) {
var access_token = window.localStorage['access_token'];

    orderListService.get_order(access_token).then(function(data){
        console.log("result",JSON.stringify(data));
        $scope.order_list = data.data.data;
    });
    $scope.order_detail = function(order_id){
        $state.go('app.order_detail',{order_id:order_id})
    }
});


