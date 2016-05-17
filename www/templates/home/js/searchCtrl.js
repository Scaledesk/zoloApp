appControllers.controller('searchCtrl', function ($scope, $timeout, $mdUtil,
                                                $mdSidenav, $log, $ionicHistory, $state,$stateParams,algolia) {
    
    var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

    $scope.filterText = '';

    console.log("search_text",$stateParams.search_text)

    var index = client.initIndex('candybrush_packages');
    
        index.search(
            $scope.filterText, {
                hitsPerPage: 5,
                facets: '*',
                maxValuesPerFacet: 10
            },
            searchCallback
        );

        function searchCallback(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            $scope.packages_list = content.hits;
            $scope.first_packages_row={};
            $scope.second_packages_row={};
            // console.log(JSON.stringify($scope.packages_list));
            $scope.packages = $scope.packages_list;
            packages_length=$scope.packages.length;
            // console.log("package length",packages_length);
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
            console.log("search result",JSON.stringify($scope.packages_list));
        }
    
    
});
