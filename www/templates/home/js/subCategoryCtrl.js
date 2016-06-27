appControllers.controller('subCategoryCtrl', function ($scope, $timeout,subCategoryListService,$ionicSlideBoxDelegate, $ionicHistory,
                                                       $state, $stateParams,$rootScope,$cordovaNetwork) {



    if($cordovaNetwork.isOnline() == true){
        $scope.online = true;
    }
    else{
        $scope.online = false;
    }

    $scope.try_again = function(){
        $rootScope.$broadcast('loading:show');
        if($cordovaNetwork.isOnline() == true){
            $scope.online = true;
            $rootScope.$broadcast('loading:hide');
            subCategoryListService.getSubCategoryWithId($stateParams.cat_id).then(function(data){
                $scope.sub_catagery_list = data.data.data;
                $ionicSlideBoxDelegate.update();
            });
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
    
    subCategoryListService.getSubCategoryWithId($stateParams.cat_id).then(function(data){
        $scope.sub_catagery_list = data.data.data;
        $ionicSlideBoxDelegate.update();
    });

    $scope.getPackages = function(id){
        $state.go('app.package_list',{'sub_cat_id':id});
    };

}); 