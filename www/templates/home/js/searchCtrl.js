appControllers.controller('searchController', function ($scope, $ionicHistory, $state,$stateParams) {
    $scope.filterText = '';

    
    $scope.search_result = function(text){
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