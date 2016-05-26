angular.module('starter').factory('CategoryService', function($http,$q,serverConfig){
    return {
        getAll : function() {
            var deffer = $q.defer();
            return $http({
                method: 'GET',
                url: serverConfig.address+'api/category'
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('MaxPriceService', function($http,$q,serverConfig){
    return {
        getMaxPrice : function() {
            var deffer = $q.defer();
            return $http({
                method: 'GET',
                url: serverConfig.address+'api/maxPrice'
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data in error",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});


angular.module('starter').factory('AssignmentService', function($http,$q,serverConfig){
    return {
        getCategoryPackages:function(id){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/category/"+id+"?include=Packages"
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('SellerProfileService', function($http,$q,serverConfig){
    return {
        getSellerInfo:function(id){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/user/"+id+"/packages"
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('ProfileService', function($http,$q,serverConfig){
    return {
        get_profile_info:function(access_token){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/myProfile?access_token="+access_token
            }).success(function(data, status, headers, config) {
                console.log("data in success of user profile",JSON.stringify(data))
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data in error",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('subCategoryService', function($http,$q,serverConfig){
    return {
        getSubCategory:function(){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/category?include=subCategory"
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('subCategoryListService', function($http,$q,serverConfig){
    return {
        getSubCategoryWithId:function(category_id){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/category/"+category_id+"?include=subCategory"
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});
angular.module('starter').factory('productService', function($http,$q,serverConfig){
    return {
        getProductDescription:function(product_id){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/package/"+product_id
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});
// mpayBookingAmount

angular.module('starter').factory('payByPayU', function($http,$q,serverConfig){
    return {
        get_payment_ifo:function(id){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/mpayBookingAmount/"+id
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('packagesService', function($http,$q,serverConfig){
    return {
        getPackagesList:function(sub_category_id){
            var deffer = $q.defer();
            return $http({
                method:"get",
                url:serverConfig.address+"api/category/"+sub_category_id+"?include=Packages"
            }).success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data",JSON.stringify(data))
            });
            return deffer.promise;
        }
    }
});


angular.module('starter').factory('signUpService', function($http,$state,$q,$mdToast,serverConfig){
    return {
    signUp: function (data) {
        var deffer = $q.defer();
        return $http({
                method: "POST",
                url: serverConfig.address+"api/signup",
                data: data
            }).
            success(function(data, status, headers, config) {
            if(data.status_code == '200'){
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: data.message
                        }
                    }
                });
                $state.go('app.home');
            }
                console.log("data in success",JSON.stringify(data))
                console.log("status in success",JSON.stringify(status))
                console.log("headers in success",JSON.stringify(headers))
                console.log("config in success",JSON.stringify(config))
            deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: data.message[0]
                    }
                }
            });
            // alert(data.message[0]);
                console.log("data",JSON.stringify(data))
                console.log("status",JSON.stringify(status))
                console.log("headers",JSON.stringify(headers))
                console.log("config",JSON.stringify(config))
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        return deffer.promise;
        }
    }
});
angular.module('starter').factory('forgetPasswordService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        forget_password: function (data) {
            var deffer = $q.defer();
            return $http({
                method: "POST",
                url: serverConfig.address+"api/users/forgotPassword",
                data: data
            }).
            success(function(data, status, headers, config) {
                
                if(data.status_code == '200'){
                    $mdToast.show({
                        controller: 'toastController',
                        templateUrl: 'toast.html',
                        hideDelay: 800,
                        position: 'top',
                        locals: {
                            displayOption: {
                                title: data.message
                            }
                        }
                    });
                }
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: data.message
                        }
                    }
                });
            });
            return deffer.promise;
        }
    };
});

angular.module('starter').factory('bookingService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        OrpInfo: function (data) {
            var deffer = $q.defer();
            return $http({
                method: "POST",
                url: serverConfig.address+"api/booking",
                data: data
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
          
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('OrderReviewService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        booking_info_orp: function (booking_id,id) {
            var deffer = $q.defer();
            return $http({
                method: "GET",
                url: serverConfig.address+"api/booking/"+booking_id
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data in error",JSON.stringify(data))
               
            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('ProfileService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        user_profile: function (access_token) {
            var deffer = $q.defer();
            return $http({
                method: "GET",
                url: serverConfig.address+"api/myProfile?access_token="+access_token
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data in error",JSON.stringify(data))

            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('GetUserAddressService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        user_address: function (user_id) {
            var deffer = $q.defer();
            return $http({
                method: "GET",
                url: serverConfig.address+"api/userAddress?user_id="+user_id
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("data in error",JSON.stringify(data))

            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('addUserAddressService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        add_user_address: function (data,user_id) {
            var deffer = $q.defer();
            return $http({
                method: "POST",
                url: serverConfig.address+"api/userAddress?user_id="+user_id,
                data: data
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {

            });
            return deffer.promise;
        }
    }
});

angular.module('starter').factory('editUserAddressService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        edit_user_address: function (data,id) {
            var deffer = $q.defer();
            return $http({
                method: "PUT",
                url: serverConfig.address+"api/userAddress/"+id,
                data: data
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {

            });
            return deffer.promise;
        }
    }
});


angular.module('starter').factory('deleteUserAddressService', function($http,$state,$q,$mdToast,serverConfig){
    return {
        delete_user_address: function (id) {
            var deffer = $q.defer();
            return $http({
                method: "DELETE",
                url: serverConfig.address+"api/userAddress/"+id
            }).
            success(function(data, status, headers, config) {
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {

            });
            return deffer.promise;
        }
    }
});


angular.module('starter').factory('addWishList', function($http,$state,$q,$mdToast,serverConfig){
    return {
        add_to_wish_list: function (data) {
            var deffer = $q.defer();
            return $http({
                method: "POST",
                url: serverConfig.address+"api/wishPackage",
                data: data
            }).
            success(function(data, status, headers, config) {
                console.log("status",status)
                deffer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("status",status)
            if(status == 500){
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Please Login'
                        }
                    }
                });
                }
            });
            return deffer.promise;
        }
    }
});