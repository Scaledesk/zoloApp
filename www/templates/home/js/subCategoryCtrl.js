appControllers.controller('subCategoryCtrl', function ($scope, $timeout,subCategoryListService, $ionicHistory, $state,
                                                       $stateParams) {
    // $scope.toggleLeft = buildToggler('right');
    //
    // function buildToggler(navID) {
    //     var debounceFn = $mdUtil.debounce(function () {
    //         $mdSidenav(navID).toggle();
    //     }, 0);
    //     return debounceFn;
    // };

    // $scope.navigateTo = function (stateName) {
    //     $timeout(function () {
    //         $mdSidenav('left').close();
    //         if ($ionicHistory.currentStateName() != stateName) {
    //             $ionicHistory.nextViewOptions({
    //                 disableAnimate: true,
    //                 disableBack: true
    //             });
    //             $state.go(stateName);
    //         }
    //     }, ($scope.isAndroid == false ? 300 : 0));
    // };
    // $ionicSideMenuDelegate.canDragContent(true);
    subCategoryListService.getSubCategoryWithId($stateParams.cat_id).then(function(data){
        $scope.sub_catagery_list = data.data.data;
    });

    $scope.getPackages = function(id){
        $state.go('app.package_list',{'sub_cat_id':id});
    };

}); 