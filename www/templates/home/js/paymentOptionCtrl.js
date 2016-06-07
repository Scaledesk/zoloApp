appControllers.controller('paymentCtrl', function ($sce,$scope,$state,$cordovaInAppBrowser,$rootScope,
                                                   $timeout, $mdUtil,payByPayU) {


    $scope.id =  window.localStorage['id'];
    var booking_id = window.localStorage['booking_id'];
    $scope.token = window.localStorage['access_token'];
    $scope.payment = {};
    
    var host = location.hostname;
     var port = location.port;

    $scope.choice={
        val:-1
    };
    

    var options = {
        // location: 'yes',
        // clearcache: 'yes',
        // toolbar: 'no',
        hardwareback:'yes'
    };

    $scope.pay = function () {
        
        var hi = 'http://54.169.76.224/payBookingAmount/'+$scope.id+'?ipadr='+host+'&port='+port+'&access_token='+$scope.token;
        
        $cordovaInAppBrowser.open('http://54.169.76.224/payBookingAmount/'+$scope.id+'?ipadr='+host+'&port='+port+'&access_token='+$scope.token, '_self',options)
            .then(function(event) {
                // success
                console.log("111",JSON.stringify(event));
            })
            .catch(function(event) {
                console.log("222",JSON.stringify(event));

            });
    };


    $scope.payment_option_list = function (val) {
        $scope.value = val;
        // $scope.makePay()
    };
    

    $scope.makePay=function(val){
        console.log("val",val);
        switch(val){
            case 1:{$scope.pay();
                break;}
        //        
            // case 2:{$scope.priceltoh();break;}
            // case 3:{$scope.newfirst();break;}
        }
    }
});

