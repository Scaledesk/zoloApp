appControllers.controller('MenuCtrl', function($scope,$ionicPopup,$mdToast,$state,$stateParams,
                                               $ionicSideMenuDelegate,$window,subCategoryService) {
    console.log("ggg");
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    // $scope.$on('logout', function (event, args) {
    //  $state.go('app.home');
    // });
    $scope.login={
        val:true
    };


    $scope.login_options = function(){
        $state.go('app.optional_index');
    };
    $scope.access_token = window.localStorage['access_token'];
    
    if($scope.access_token!=''){
        $scope.login.val = false;
    }
    console.log("dddd",$scope.access_token);

    $scope.logOut = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure ?',
            template: 'You want to logOut.'
        });
        confirmPopup.then(function(res) {
            if(res) {
                window.localStorage['access_token'] ='';
                window.localStorage['pro_id'] ='';
                window.localStorage['orp_page'] = '';
                $window.location.reload();
                // $state.reload('app.home');
                // $scope.$broadcast('logout', {message: 'log out'});
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Logged out successfully.'
                        }
                    }
                });
            }
            else {
                console.log('You are not sure');
            }
        });
    };


    $scope.filterText = '';

    $scope.search_result = function(){
        if($scope.filterText){
            $state.go('app.search_info',{'search_text':$scope.filterText});

        }
    };


    subCategoryService.getSubCategory().then(function(data){
        $scope.category_n_sub_catagery_list = data.data.data;
    });

    $scope.allSubcategory = function(id){
        $state.go('app.subCategory',{'cat_id':id});
    };
    $scope.getPackages = function(id){
        $state.go('app.package_list',{'sub_cat_id':id});
    }
});

