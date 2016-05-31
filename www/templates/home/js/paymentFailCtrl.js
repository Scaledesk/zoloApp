appControllers.controller('paymentFailCtrl', function ($scope, $timeout, $mdUtil,$location,generateNewTransactionService,
                                                         $mdSidenav,$stateParams, $log, $ionicHistory, $state,$stateParams) {

    var booking_id = $location.search().booking_id;
    var transaction_id = $location.search().transaction_id;

    console.log(booking_id);
    console.log(transaction_id);

    $scope.try_again = function(){
        console.log('shdghsv');
        generateNewTransactionService.transaction_generate(transaction_id).then(function(data){
            console.log("transaction data:",JSON.stringify(data));
            var t_id = data.data.data;
            window.localStorage['id'] = t_id ;
            $state.go('app.orp');
            // $location.path('/orp/'+booking_id+'/'+t_id)
        })
    };

});


