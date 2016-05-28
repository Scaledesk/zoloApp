appControllers.controller('orderReviewCtrl', function ($scope, $timeout,$state, $mdUtil,OrderReviewService) {
  
  var id =  window.localStorage['id'];
  var booking_id = window.localStorage['booking_id'];
  $scope.isChecked = true;
  var access_token = window.localStorage['access_token'];


  OrderReviewService.booking_info_orp(booking_id,id).then(function(data){
      $scope.orp_result = data.data.data;
    });

  $scope.payment = function(){
    $state.go('app.add_address');
  };

  $scope.add_address = function(){
    $state.go('app.address');
  };
  
  
  
  $scope.payment_option = function(){
    $state.go('app.paymentOption');
  };
  
});

