appControllers.controller('packagesCtrl', function ($scope, $timeout, $mdUtil,packagesService,$ionicModal,
                                                       $mdSidenav, $log, $ionicHistory, $state,$stateParams) {

    $scope.sub_category = false;
    $scope.category = false;
    $scope.package_type = false;
    $scope.price_list = true;
    $scope.sorting_value = false;

    packagesService.getPackagesList($stateParams.sub_cat_id).then(function(data){
        $scope.packages_list = data.data.data;
        $scope.first_packages_row={};
        $scope.second_packages_row={};
        console.log(JSON.stringify($scope.packages_list));
        $scope.packages = $scope.packages_list.Packages.data;
        packages_length=$scope.packages.length;
        console.log("package length",packages_length);
        if(packages_length == 1){
            $scope.first_packages_row.data = $scope.packages;
            console.log("sonam",JSON.stringify($scope.first_packages_row.data))
        }
        else{
            break_length=packages_length/2;
            $scope.first_packages_row.data = $scope.packages.slice(0, break_length);
            $scope.second_packages_row.data = $scope.packages.slice(break_length + 1);
        }
        delete break_length;
    });

    $scope.productDescription = function(id){
        $state.go('app.product_desc',{'product_id':id})
    };
    $ionicModal.fromTemplateUrl('templates/home/html/search_package_short_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openSortAndFilterModal = function() {
        $scope.modal.show();
    };
    $scope.closeSortAndFilterModal = function() {
        $scope.modal.hide();
    };
    $scope.category_list = function(){
        $scope.category = true;
        $scope.sub_category = false;
        $scope.package_type = false;
        $scope.price_list = false;
        console.log("1")
    };
    $scope.sub_category_list = function(){
        console.log("2")
        $scope.category = false;
        $scope.sub_category = true;
        $scope.package_type = false;
        $scope.price_list = false;
    };
    $scope.package_type_option = function(){
        $scope.sub_category = false;
        $scope.category = false;
        $scope.package_type = true;
        $scope.price_list = false;
        console.log("3")
    };
    $scope.price_list_option = function(){
        $scope.sub_category = false;
        $scope.category = false;
        $scope.package_type = false;
        $scope.price_list = true;
        $scope.sorting_value = false;
        console.log("4")
    };
    $scope.sorting_option = function(){
        $scope.price_list = false;
        $scope.sorting_value = true;

    };
});