appControllers.controller('searchController', function ($scope, $log, $ionicHistory, $state,$stateParams) {
    // $ionicHistory.clearHistory();

    $scope.filterText = '';

    $scope.search_result = function(text){
        console.log("ddd",text)
        if(text){
            $state.go('app.search_info',{'search_text':text});
        }
    };

    $scope.back_to_home = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.home');
    };
});