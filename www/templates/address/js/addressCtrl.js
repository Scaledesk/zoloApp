appControllers.controller('addressCtrl', function ($scope, $timeout,$state, $mdUtil,GetUserAddressService,
                                                   ProfileService,$stateParams) {
    
    var access_token = window.localStorage['access_token'];

    var user_id = window.localStorage['user_id'];


    ProfileService.user_profile(access_token).then(function (data) {
        console.log("user profile",JSON.stringify(data));
        window.localStorage['user_id']=data.data.data.user_id;

        if(data.data.data.user_id){

            var id = data.data.data.user_id;
            GetUserAddressService.user_address(id).then(function(data){

                $scope.user_address = data.data.data;
                
            })
        }
    });


    $scope.skip = function(){
        $state.go('app.paymentOption');
    };
    
    $scope.address_info = function () {
        $state.go('app.address_fill');
    };
    
    $scope.edit_address = function(edit_id){
        $state.go('app.edit_address',{edit_id:edit_id});
    };

    $scope.payment_option = function(){
        $state.go('app.paymentOption');
    };
    
});


