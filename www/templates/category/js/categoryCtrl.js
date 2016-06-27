appControllers.controller('CategoryCtrl', function ($scope,CategoryService, $ionicHistory,$cordovaNetwork,$rootScope,
                                                    $state,$stateParams,$ionicSlideBoxDelegate) {

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
            CategoryService.getAll().then(function(data){
                $scope.categories = data.data.data;
                $ionicSlideBoxDelegate.update();
            });
        }
        else{
            $scope.online = false;
            $rootScope.$broadcast('loading:hide');
        }
    }; 
   
   
    CategoryService.getAll().then(function(data){
        $scope.categories = data.data.data;
        $ionicSlideBoxDelegate.update();
    });

    $scope.allSubcategory = function(id){
        $state.go('app.cat_sub_cat_list',{'cat_id':id});
    };
});
