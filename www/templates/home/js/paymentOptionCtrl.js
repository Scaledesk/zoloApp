appControllers.controller('paymentCtrl', function ($sce,$scope,$state,$cordovaInAppBrowser,$rootScope,
                                                   $timeout, $mdUtil,payByPayU) {


    $scope.id =  window.localStorage['id'];
    var booking_id = window.localStorage['booking_id'];
    $scope.token = window.localStorage['access_token'];
    $scope.payment = {};
    // $scope.url = function () {
    //     return $sce.trustAsResourceUrl('http://54.169.76.224/mpayBookingAmount/'+$scope.id);
    // };
// $scope.myurl=$scope.url();


    var options = {
        // location: 'yes',
        // clearcache: 'yes',
        // toolbar: 'no',
        hardwareback:'yes'
    };

    $scope.pay = function () {
        $cordovaInAppBrowser.open('http://54.169.76.224/mpayBookingAmount/'+$scope.id, '_self',options)
            .then(function(event) {
                // success
                console.log("111",JSON.stringify(event));
            })
            .catch(function(event) {
                console.log("222",JSON.stringify(event));

                // error
            });


        $cordovaInAppBrowser.close();

    };

    $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
alert('loading...')
    });

    $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
        // insert CSS via code / file
        $cordovaInAppBrowser.insertCSS({
            code: 'body {background-color:blue;}'
        });

        // insert Javascript via code / file
        $cordovaInAppBrowser.executeScript({
            file: 'script.js'
        });
    });

    $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){

    });

    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){

    });




$scope.pay_by_payU = function(){
$scope.pay();
        // window.open('http://54.169.76.224/mpayBookingAmount/'+$scope.id, '_self');
        // $state.go('app.pay_u');
        $scope.payment.payU = true;
        $scope.payment.payTm = false;
        $scope.payment.zolo = false;

        // payByPayU.get_payment_ifo(id).then(function(data){
        //     console.log("dataaaaa")
        // });

        console.log("1", $scope.payment.payU)
    };
    $scope.pay_by_payTm = function(){

        $scope.payment.payTm = true;
        $scope.payment.zolo = false;
        $scope.payment.payU = false;

        console.log("2",$scope.payment.payTm)
    };
    $scope.pay_by_zolo = function(){


        $scope.payment.zolo = true;
        $scope.payment.payU = false;
        $scope.payment.payTm = false;
        console.log("3", $scope.payment.zolo)
    };

});

