appControllers.controller('CategoryCtrl', function ($scope, $timeout, $mdUtil,CategoryService,
                                                       $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    $scope.toggleLeft = buildToggler('right');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };
    CategoryService.getAll().then(function(data){
        $scope.categories = data.data.data;
        console.log(JSON.stringify($scope.categories));
    });

    $scope.allSubcategory = function(id){
        console.log("1wwww",id);
        $state.go('app.subCategory',{'cat_id':id});
    }
});
