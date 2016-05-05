appControllers.controller('packagesListCtrl', function ($scope, $timeout, $mdUtil,packagesService,
                                                       $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    $scope.toggleLeft = buildToggler('right');
    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };
    $scope.navigateTo = function (stateName,id) {
        console.log("aaaaaaaaaa",id)
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName,{'category_id':id});
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };
    packagesService.getPackagesList($stateParams.sub_category_id).then(function(data){
        $scope.packages_list = data.data.data;
        console.log("11111111111",JSON.stringify($scope.packages_list));
        $scope.packages = $scope.packages_list.Packages.data;
        packages_length=$scope.packages.length;
        break_length=packages_length/2;
        $scope.first_packages_row={};
        $scope.second_packages_row={};
        $scope.first_packages_row.data = $scope.packages.slice(0, break_length);
        $scope.second_packages_row.data = $scope.packages.slice(break_length + 1);
        delete break_length;
    });

    $scope.productDescription = function(id){
        $state.go('app.product_description',{'des_product_id':id})
    }
});