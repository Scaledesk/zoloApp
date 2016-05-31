appControllers.controller('homeCtrl', function ($scope, $timeout, $mdUtil,subCategoryService,
                                                $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    // $ionicHistory.clearHistory();
   
    $scope.filterText = '';
    
    $scope.search_result = function(){
        console.log("111")
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