appControllers.controller('paymentCtrl', function ($sce,$scope,$state,$cordovaInAppBrowser,$rootScope,$ionicModal,
                                                   $timeout, $mdUtil,payByPayU) {


    $scope.id =  window.localStorage['id'];
    var booking_id = window.localStorage['booking_id'];
    $scope.token = window.localStorage['access_token'];
    $scope.payment = {};

    // networkinterface.getIPAddress(function (ip) {
    //      $scope.host = ip;
    // });
    //
   $scope.host = location.hostname;
     var port = location.port;
    // var host = 'localhost';
    // $scope.host = 'localhost';
    // var port = 8000;
    // alert(host);
    // alert(port);
    $scope.choice={
        val:-1
    };
    

    var options = {
        location: 'yes',
        // clearcache: 'yes',
        // toolbar: 'no',
        hardwareback:'yes'
    };

    $ionicModal.fromTemplateUrl('templates/home/html/refundPolicyModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.refund_Policy_open = function () {
        $scope.modal.show();
    };
    $scope.refund_Policy_close = function () {
        $scope.modal.hide();
    };



    $scope.pay = function (host) {

        // try {
        //     var cb = new ChildBrowser();
        //     console.log(cb);
        //     cb.showWebPage('http://www.google.com');
        // }catch (err){
        //     console.log(JSON.stringify(err));
        // }

        // window.plugins.childBrowser.showWebPage('http://54.169.76.224/payBookingAmount/'+$scope.id+'?ipadr='+host+'&port='+port+'&access_token='+$scope.token,
        //     { showLocationBar: true });
      
        // $cordovaInAppBrowser.open('http://54.169.76.224/payBookingAmount/'+$scope.id+'?ipadr='+host+'&port='+port+'&access_token='+$scope.token, '_blank',options)
        //     .then(function(event) {
        //         // success
        //         console.log("111",JSON.stringify(event));
        //     })
        //     .catch(function(event) {
        //         alert("fail")
        //         console.log("222",JSON.stringify(event));
        //
        //     });

        ref = window.open('http://54.169.76.224/payBookingAmount/'+$scope.id+'?ipadr='+host+'&port='+port+'&access_token='+$scope.token, '_blank', 'location=yes');
        ref.addEventListener('loadstart', function(event) {
            var URL=event.url;
            var n = URL.startsWith("http://"+$scope.host +':'+port+'/#/app/payment_fail');
            if(n==true){
                alert('inside app')
                iabRef.close();
                // root reload
            }
        });
    };


    $scope.payment_option_list = function (val) {
        $scope.value = val;
        // $scope.makePay()
    };
    

    $scope.makePay=function(val,host_ip){
        console.log("val",val,host_ip);
        switch(val){
            case 1:{$scope.pay(host_ip);
                break;}
        //        
            // case 2:{$scope.priceltoh();break;}
            // case 3:{$scope.newfirst();break;}
        }
    }
});

