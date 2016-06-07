appControllers.controller('moreCtrl', function($scope,$mdToast,$state) {

  $scope.term_n_cond = function(){
    $state.go('app.term_n_con');
  };
    $scope.refund_policy = function(){
    $state.go('app.refund_policy');
  };
    $scope.cancellationPolicy = function(){
    $state.go('app.cancellationPolicy');
  };
    $scope.privacy_policy = function(){
    $state.go('app.privacy_policy');
  };

});
