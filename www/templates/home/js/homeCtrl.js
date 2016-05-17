appControllers.controller('homeCtrl', function ($scope, $timeout, $mdUtil,subCategoryService,
                                                $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
    $scope.toggleLeft = buildToggler('right');
    // var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

    $scope.filterText = '';

    // var index = client.initIndex('candybrush_packages');


    $scope.search_result = function(){
if($scope.filterText){
    $state.go('app.search_info',{'search_text':$scope.filterText});

}

        // searchService.getAllPackage($scope.filterText).then(function(data){
        //     console.log("sssssssssssss",JSON.stringify(data));
        // })

// the last optional argument can be used to add search parameters
//         index.search(
//             $scope.filterText, {
//                 hitsPerPage: 5,
//                 facets: '*',
//                 maxValuesPerFacet: 10
//             },
//             searchCallback
//         );
//
//         function searchCallback(err, content) {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//
//             console.log("search result",JSON.stringify(content));
//         }

    };

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