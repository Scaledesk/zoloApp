appControllers.controller('orderReviewCtrl', function ($scope, $timeout,$state, $mdUtil,OrderReviewService,
                                                       ProfileService,GetUserAddressService) {
  
  var id =  window.localStorage['id'];
  var booking_id = window.localStorage['booking_id'];
  $scope.isChecked = true;
  var access_token = window.localStorage['access_token'];



  // app.option_address


  OrderReviewService.booking_info_orp(booking_id,id).then(function(data){
      $scope.orp_result = data.data.data;
                console.log("result",JSON.stringify($scope.orp_result))

    });

  $scope.payment = function(){
    $state.go('app.add_address');
  };

  $scope.add_address = function(){

    // ProfileService.user_profile(access_token).then(function (data) {
    //   console.log("user profile",JSON.stringify(data));
    //   if(data.data.data.user_id){
    //     var id = data.data.data.user_id;
    //     GetUserAddressService.user_address(id).then(function(data){
    //       console.log("user address info",data.data.data.length);
    //
    //       if(data.data.data.length == '0'){
    //         $state.go('app.option_address');
    //       }
    //       else{
            $state.go('app.address');
        //   }
        // })
    //   }
    // });

  };
  
  
  
  $scope.payment_option = function(){
    $state.go('app.paymentOption');
  };



});

