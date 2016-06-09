appControllers.controller('orderReviewSearchCtrl', function ($scope, $timeout,$state, $stateParams,OrderReviewService) {
  
  var id =  window.localStorage['id'];
  var booking_id = window.localStorage['booking_id'];
  $scope.isChecked = true;
  var access_token = window.localStorage['access_token'];
  window.localStorage['cat_id'] = $stateParams.cat_id;
  window.localStorage['product_id'] = $stateParams.product_id;
  window.localStorage['search_text'] = $stateParams.search_text;

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
  
  $scope.back_to_search_pdp = function(){
    $state.go('app.search_pdp',{'search_text': $stateParams.search_text,'cat_id': $stateParams.cat_id,'product_id':$stateParams.product_id});
  };
});

