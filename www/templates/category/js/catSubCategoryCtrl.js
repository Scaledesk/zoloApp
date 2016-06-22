appControllers.controller('catSubCategoryCtrl', function ($scope, $timeout,subCategoryListService, $ionicHistory,
                                                       $state, $stateParams,$cordovaNetwork,$rootScope) {

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

            });
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    };
  
  
  
    subCategoryListService.getSubCategoryWithId($stateParams.cat_id).then(function(data){
        $scope.sub_catagery_list = data.data.data;
        
    });
    $scope.getPackagesForCat = function(category_id,id){
        $state.go('app.cat_package_list',{'cat_id':category_id,'sub_cat_id':id},{reload:true});
    };
    
    $scope.back_to_category_side = function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.allCategory');
    };

}); 