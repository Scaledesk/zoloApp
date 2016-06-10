appControllers.controller('paymentFailCtrl', function ($scope,$location,generateNewTransactionService,$stateParams,
                                                       $ionicHistory, $state,$stateParams) {

    var booking_id = $location.search().booking_id;
    var transaction_id = $location.search().transaction_id;

    var cat_id = window.localStorage['cat_id'];
    var product_id = window.localStorage['product_id'];
    $scope.search_text =  window.localStorage['search_text'];
    $scope.sub_cat_id = window.localStorage['sub_cat_id'];
    $scope.home_id = window.localStorage['home_id'];

    if($scope.home_id){
        $scope.flag=1;
        window.localStorage['search_text'] = '';
        window.localStorage['sub_cat_id'] ='';
    }
    else if($scope.search_text){
        $scope.flag=2;
        window.localStorage['home_id'] = '';
        window.localStorage['sub_cat_id'] ='';
    }
    else if($scope.sub_cat_id){
        $scope.flag=3;
        window.localStorage['search_text'] = '';
        window.localStorage['home_id'] = '';
    }

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
            $state.go('app.orp_search',{'search_text':window.localStorage['search_text'],'cat_id':cat_id,'product_id':product_id});
        })
    };

    $scope.try_again_cat = function(){
        generateNewTransactionService.transaction_generate(transaction_id).then(function(data){
            var t_id = data.data.data;
            window.localStorage['id'] = t_id ;
            $state.go('app.orp_cat',{'cat_id':cat_id,'sub_cat_id':window.localStorage['sub_cat_id'],'product_id':product_id});
        })

    };
});


