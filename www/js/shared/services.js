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
                            title: data.message
                        }
                    }
                });
                console.log("data",JSON.stringify(data))
                console.log("status",JSON.stringify(status))
                console.log("headers",JSON.stringify(headers))
                console.log("config",JSON.stringify(config))
            });
            return deffer.promise;
        }
    }
});

