appControllers.controller('productDescriptionCtrl', function ($scope,productService,bookingService, $ionicHistory, 
                                                              $state,$stateParams,addWishList, $mdToast,$ionicScrollDelegate,
                                                              $ionicModal, OrderReviewService,$mdBottomSheet,
                                                              SellerProfileService,$timeout,$ionicSlideBoxDelegate) {
    $scope.des_value = true;
    $scope.pec_value = false;
    $scope.term_n_cond = false;
    $scope.booking_add_ons = false;
    $scope.booking_add_ons_list = false;
    $scope.default_quantity_add_ons = 1;
    $scope.default_quantity = 1;
    $scope.selectedaddons=[];
    $scope.book={
        quantity:1
    };
    $scope.book_new={
        quantity_new:1
    };

   $scope.quantities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
   $scope.new_quantities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };
    $scope.slideIndex = 0;
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };

    $scope.back_to_package = function() {
        $state.go('app.package_list', {'sub_cat_id': $stateParams.cat_id});
    };
    var booking_info = {};


    $ionicModal.fromTemplateUrl('templates/home/html/review.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openReviewModel = function () {
        $scope.modal.show();
    };
    $scope.closeReviewModel = function () {
        $scope.modal.hide();
    };


    $ionicModal.fromTemplateUrl('templates/home/html/add_ons.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.add_on_modal = modal;
    });
    $scope.openAddOnsModel = function () {
        $scope.add_on_modal.show();
        $scope.booking_add_ons = true;

    };
    $scope.closeAddOnsModel = function () {
        $scope.add_on_modal.hide();
    };

    $scope.package_quantity = function(quant,price,p_id){
            var quantity = quant;
            var price = price;
            var p_id = p_id;
         console.log("sonamamama",price,quantity,p_id);
    };
     $scope.addon_quantity = function(quant,price,add_id){
            var quantity = quant;
            var price = price;
            console.log("sonamamama 222",price,quantity,add_id);
    };

    $scope.setIndex=function(index,checked){
        console.log("checked",checked)
        if(checked==true){
            $timeout(function(){
                $scope.currentIndex=index;
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

    $scope.add_wish_list = function(id_user,p_id){
        var data ={
            user_id:id_user,
            package_id:p_id
        }
        addWishList.add_to_wish_list(data).then(function(data){
            if(data.data.message == 'success'){
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Package added to wish list successfully!'
                        }
                    }
                });
            }
        });
    };
    
    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        $scope.paddons =  $scope.package.Addons.data;
        $scope.amount_to_show = $scope.package.deal_price;
         booking_info = {
            quantity:$scope.book.quantity,
             package_id:$scope.package.id,
            addons:[]
        };
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });
    $scope.active_tab = 'description';

    $scope.description_value = function () {
        $scope.active_tab = 'description';
        $scope.des_value = true;
        $scope.pec_value = false;
        $scope.term_n_cond = false;
    };

    $scope.term_n_condition = function () {
        $scope.active_tab = 'term';
        $scope.des_value = false;
        $scope.pec_value = false;
        $scope.term_n_cond = true;
    };
    $scope.full_desc = function(id){
        $state.go('app.full_description',{product_id:id});
    };

    $scope.package_summary = function(){
        $scope.active_tab = 'p_summery';
        $scope.des_value = false;
        $scope.pec_value = true;
        $scope.term_n_cond = false;
    };

    $scope.seller_Profile = function(id){
        $state.go('app.seller_profile',{product_id:id});
    };
    
    $scope.book_now = function () {
        $scope.booking_add_ons = true;
        $timeout(function(){
            $ionicScrollDelegate.scrollBottom(true);
        },2000)
    };
    
    $scope.book_now_confirm = function(){
        booking_info.quantity = $scope.book.quantity;
        angular.forEach($scope.selectedaddons,function(obj){
            var ff={
                id:obj.id[0],
                quantity:obj.quantity
            }
            booking_info.addons.push(ff);
        });
        if((window.localStorage['access_token']) && (window.localStorage['access_token'] != 'undefined')){
            bookingService.OrpInfo(booking_info).then(function(data) {
                var info = data.data.data;
                window.localStorage['id'] = info.id;
                window.localStorage['booking_id'] = info.booking_id;
                $state.go('app.orp',{booking_id:info.booking_id,t_id:info.id});
            });
        }
        else{
            var p_id = $stateParams.product_id;
            $state.go('app.optional_index_pdp');
            window.localStorage['pro_id']= p_id;
            window.localStorage['cat_id']= $stateParams.cat_id;
        }
    };

    $scope.shareProduct = function ($event,name,image,slug_url) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                slug_url: slug_url,
                image:image,
                name:name
            }
        });
    };
});