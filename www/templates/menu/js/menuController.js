appControllers.controller('MenuCtrl', function($scope,$ionicPopup,$mdToast,$state,$stateParams,profileService,$ionicHistory,
                                               $ionicSideMenuDelegate,subCategoryService,bannerService,$rootScope) {
   
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };


    bannerService.get_banner().then(function(response){
        $scope.banner = response.data.data;
    });

    $scope.access_token = window.localStorage['access_token'];

    $scope.login_value = true;

    $scope.$on('logged_in', function (event, args) {
        $scope.message = args.message;
        $scope.login_value = false;
        if($scope.access_token && $scope.access_token != 'undefined'){
            profileService.get_profile($scope.access_token).then(function(data){
                $scope.profile = data.data.data;
            })
        }
    });

    $rootScope.$on('logout', function (event, args) {
        console.log("inside logout")
        $scope.message = args.message;
        $scope.login_value = true;

    });



    $scope.login_options = function(){
        $state.go('app.optional_index');
    };

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
                // $window.location.reload();
                $scope.$broadcast('logout', {message: 'log out'});
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.home');
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

