appControllers.controller('addAddressCtrl', function ($scope, $timeout,$state, $mdUtil,GetUserAddressService,
                                                   ProfileService,addUserAddressService) {

    var access_token = window.localStorage['access_token'];
    $scope.user = {};

    $scope.user.default = false;
    
    var user_id = window.localStorage['user_id'];

    $scope.skip = function(){
        $state.go('app.paymentOption');
    };
    
    addAddressData = function () {
        data = {
            "name": $scope.user.name,
            "street_address": $scope.user.address,
            "pincode": $scope.user.pincode,
            "landmark": $scope.user.landmark,
            "city": $scope.user.city,
            "state": $scope.user.state,
            "phone_number": $scope.user.mobile,
            "is_default": $scope.user.default,
        }
        console.log("dataaa",JSON.stringify(data))
    };


    $scope.save_address = function(){
        addAddressData();
        addUserAddressService.add_user_address(data,user_id).then(function(data){
            console.log("aaaaaaaaaaaaaaaaaaaa",JSON.stringify(data));
            if(data.data.message=='success'){
                $state.go('app.address');
            }
            else{
                alert('some error !');
            }
        });
    };

});



