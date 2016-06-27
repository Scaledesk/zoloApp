appControllers.controller('wishListCtrl', function ($scope,wishListService,removeWishListService,$mdToast,$rootScope,
                                                    $ionicPopup,$state) {
    var access_token = window.localStorage['access_token'];


   
    wishListService.get_wish_list(access_token).then(function(response){
        $scope.wishList = response.data.data;
        console.log("wishlist",JSON.stringify(response))
    });

    
    $rootScope.$on('wishListChanged', function (event, args) {
        console.log("inside wish list change")
        $scope.message = args.message;
        wishListService.get_wish_list(access_token).then(function(response){
            $scope.wishList = response.data.data;
            console.log("wishlist",JSON.stringify(response))
        })
    });

    $scope.productDescription = function (sub_cat,p_id) {
        $state.go('app.product_desc', {'cat_id':sub_cat,'product_id': p_id})
    };
    
    $scope.remove_wishList = function (p_id) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure ?',
            template: 'You want to remove from wish list.'
        });
        confirmPopup.then(function(res) {
            if(res) {
                removeWishListService.remove_wish_list(p_id,access_token).then(function(data){
                    if(data.data.message == 'success'){
                        $mdToast.show({
                            controller: 'toastController',
                            templateUrl: 'toast.html',
                            hideDelay: 800,
                            position: 'top',
                            locals: {
                                displayOption: {
                                    title: 'Package removed successfully.'
                                }
                            }
                        });
                        $rootScope.$broadcast('wishListChanged', { message: 'Change in address list' });
                        $state.go('app.wishlist', null, {reload:true});

                    }
                });
            } else {
                console.log('You are not sure');
            }
        });
    }
      
});