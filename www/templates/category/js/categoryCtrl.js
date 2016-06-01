appControllers.controller('CategoryCtrl', function ($scope, $timeout, $mdUtil,CategoryService,
                                                       $mdSidenav, $log, $ionicHistory, $state,$stateParams) {
   
    CategoryService.getAll().then(function(data){
        $scope.categories = data.data.data;
        console.log(JSON.stringify($scope.categories));
    });

    $scope.allSubcategory = function(id){
        console.log("1wwww",id);
        $state.go('app.subCategory',{'cat_id':id});
    }
});
