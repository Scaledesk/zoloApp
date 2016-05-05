appControllers.controller('subCategoryListCtrl', function ($scope, $timeout, $mdUtil,subCategoryListService,
                                                $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    $scope.toggleLeft = buildToggler('right');
    
    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };

    $scope.navigateTo = function (stateName,id) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName,{'sub_category_id':id});
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };

    subCategoryListService.getSubCategoryWithId($stateParams.category_id).then(function(data){
        $scope.sub_catagery_list = data.data.data;
        console.log(JSON.stringify($scope.sub_catagery_list));
    });

    $scope.getPackages = function(id){
        $state.go('app.package_list_menu',{'sub_category_id':id});
    };

}); 