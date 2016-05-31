appControllers.controller('subCategoryCtrl', function ($scope, $timeout,subCategoryListService, $ionicHistory,
                                                       $state, $stateParams) {

    subCategoryListService.getSubCategoryWithId($stateParams.cat_id).then(function(data){
        $scope.sub_catagery_list = data.data.data;
    });

    $scope.getPackages = function(id){
        $state.go('app.package_list',{'sub_cat_id':id});
    };

}); 