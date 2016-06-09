appControllers.controller('paymentFailCtrl', function ($scope,$location,generateNewTransactionService,$stateParams,
                                                       $ionicHistory, $state,$stateParams) {

    var booking_id = $location.search().booking_id;
    var transaction_id = $location.search().transaction_id;

    var cat_id = window.localStorage['cat_id'];
    var product_id = window.localStorage['product_id'];
    $scope.search_text =  window.localStorage['search_text'];


    $scope.try_again = function(){
        generateNewTransactionService.transaction_generate(transaction_id).then(function(data){
            var t_id = data.data.data;
            window.localStorage['id'] = t_id ;
            $state.go('app.orp',{'cat_id':cat_id,'product_id':product_id});
        })
    };

    $scope.try_again_search = function(){
        generateNewTransactionService.transaction_generate(transaction_id).then(function(data){
            var t_id = data.data.data;
            window.localStorage['id'] = t_id ;
            $state.go('app.orp_search',{'search_text':$scope.search_text,'cat_id':cat_id,'product_id':product_id});
        })
    };
});


