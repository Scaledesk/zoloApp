appControllers.controller('productDescriptionCtrl', function ($scope, $timeout, $mdUtil,productService,
                                                    $mdSidenav, $log, $ionicHistory, $state,$stateParams,SellerProfileService) {
    $scope.des_value = true;
    $scope.pec_value = false;
    $scope.term_n_cond = false;
    $scope.booking_add_ons = false;
    $scope.booking_add_ons_list = false;
    $scope.default_quantity_add_ons = 1;
    $scope.default_quantity = 1;
    $scope.quantities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    $scope.selectedaddons=[];
    $scope.book={
        quantity:1
    };

    $scope.setIndex=function(index,checked){
        if(checked==true){
            $timeout(function(){
                $scope.currentIndex=index;
                //this boolean passed in the calcAmount is opposite to the checked got above because
                //we have to exclude the addon when uncheck event is encountered in thet case chaecked returned is false
                //otherwise in normal it returned true.
                calcAmount($scope.currentIndex,false);
            },1000);
        }else{
            $timeout(function(){
                $scope.currentIndex=index;
                calcAmount($scope.currentIndex,true);
            },1000);
        }



    };
    var calcAmount=function(index,deleteit){
        var flag=0;
        if(deleteit==true){
            flag=1;
        }
        var amount=0;
        //index is used, just to get the amount of the addons and nothing else
        if(index!=-1){
            if(typeof ($scope.selectedaddons[index])!='undefined') {
                $scope.selectedaddons[index].amount = $scope.paddons[index].amount;
            }
        }
        //calculate the price of the addons to add to the basew amount of the package
        angular.forEach($scope.selectedaddons,function(addon){
            if(typeof addon.quantity == 'undefined'){
                addon.quantity=1;
            }
            if(typeof addon.id != 'undefined'){
                if(flag==1){
                    if(addon.id.length!=0)
                        amount=amount+parseInt(addon.quantity)*parseInt(addon.amount);
                }else
                {
                    amount=amount+parseInt(addon.quantity)*parseInt(addon.amount);
                }
            }
        });
        $scope.amount_to_show=amount+$scope.package.deal_price*($scope.book.quantity);
    };

    
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        $scope.paddons =  $scope.package.Addons.data;
        $scope.amount_to_show = $scope.package.deal_price;
        console.log("pdp",JSON.stringify($scope.package));
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });
    

    $scope.description_value = function () {
        $scope.des_value = true;
        $scope.pec_value = false;
        $scope.term_n_cond = false;
    };
    $scope.term_n_condition = function () {
        $scope.des_value = false;
        $scope.pec_value = false;
        $scope.term_n_cond = true;
    };
    $scope.full_desc = function(id){
        $state.go('app.full_description',{product_id:id});
    };
    $scope.package_summary = function(){
        $scope.des_value = false;
        $scope.pec_value = true;
        $scope.term_n_cond = false;
    };

    $scope.seller_Profile = function(id){
        $state.go('app.seller_profile',{product_id:id});
    };
    
    $scope.book_now = function () {
        $scope.booking_add_ons = true;
    };
});
