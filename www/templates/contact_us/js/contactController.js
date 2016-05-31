
appControllers.controller('contactCtrl', function ($scope,$stateParams, $timeout, ContactService, $state, $auth,
                                                  $mdToast,$ionicHistory) {

    $scope.customer = {};

    signUpData = function () {
        data = {
            "email": $scope.customer.email,
            "mobile": $scope.customer.mobile,
            "name": $scope.customer.name,
            "message": $scope.customer.message
        }
        console.log("dataaa",JSON.stringify(data))
    };



    $scope.contact_zolo = function () {
        signUpData();
        if(($scope.customer.name)&&($scope.customer.email)&&($scope.customer.mobile)&&($scope.customer.message)){
            if($scope.customer.mobile.toString().length == 10){
                ContactService.contact(data).then(function (data) {
                    console.log("data",JSON.stringify(data));
                    if(data.data.message == 'success'){
                        $mdToast.show({
                            controller: 'toastController',
                            templateUrl: 'toast.html',
                            hideDelay: 800,
                            position: 'top',
                            locals: {
                                displayOption: {
                                    title: 'Your request submited'
                                }
                            }
                        });
                    }
                    else{
                        $mdToast.show({
                            controller: 'toastController',
                            templateUrl: 'toast.html',
                            hideDelay: 800,
                            position: 'top',
                            locals: {
                                displayOption: {
                                    title: 'Sorry, try again!'
                                }
                            }
                        });
                    }
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.home');
                });
            }
            else{
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Mobile should have 10 digits!'
                        }
                    }
                });
            }
        }
        else{
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Please, fill above required fields!'
                    }
                }
            });
        }
        
    };
});

