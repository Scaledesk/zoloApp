appControllers.controller('editAddressCtrl', function ($scope, $timeout,$state, $mdUtil,GetUserAddressService,
                                                      editUserAddressService,$stateParams) {

    var access_token = window.localStorage['access_token'];

    console.log("sonam",JSON.stringify($stateParams));

    $scope.address = {};

    var user_id = window.localStorage['user_id'];

    $scope.skip = function(){
        $state.go('app.paymentOption');
    };
    

    GetUserAddressService.user_address(user_id).then(function(data){

        $scope.user_address = data.data.data;

        angular.forEach($scope.user_address , function (obj) {
           if(obj.id == $stateParams.edit_id){
               $scope.address = obj;
               console.log("1",JSON.stringify($scope.address))
               if($scope.address.is_default == '0'){
                   $scope.address.is_default = false;
               }
               else{
                   $scope.address.is_default = true;
               }
           }

        });
        console.log("user address info",JSON.stringify(data));
    });



    $scope.edit_address = function(add_id){
        var id = add_id;
        editUserAddressService.edit_user_address($scope.address,id).then(function (data) {
            if(data.data.message == 'success'){
              alert('Address edited successfully.');
                $scope.$broadcast('addressListChanged', { message: 'Change in address list' });
                $state.go('app.address');

            }
            else{
                alert('error');
            }
        })
    };

});




