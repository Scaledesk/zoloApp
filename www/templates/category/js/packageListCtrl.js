appControllers.controller('packagesListCtrl', function ($scope, $timeout, $mdUtil,packagesService,
                                                       $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    
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
        // $state.go('app.product_description',{'des_product_id':id})
        $state.go('app.product_desc',{'product_id':id})

    }
});