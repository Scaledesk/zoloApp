appControllers.controller('searchCtrl', function ($scope, $timeout, $mdUtil,MaxPriceService,$ionicModal,$rootScope,
                                                $mdSidenav, $log, $ionicHistory, $state,$stateParams,algolia) {
    
    var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

    $scope.filterText = $stateParams.search_text;
    
    var index = client.initIndex('candybrush_packages');



    $scope.search_packages = function(filterText,load_option){
        $rootScope.$broadcast('loading:show');
        if(load_option == false){
            console.log("inside if")
            index.search(
                filterText, {
                    hitsPerPage: 5,
                    facets: '*',
                    maxValuesPerFacet: 10
                }).then(
                function(content){
                            $scope.packages = content.hits;
                            $scope.total_page=content.nbPages;
                            $scope.current_page=content.page;
                            $rootScope.$broadcast('loading:hide');

                }
            ).catch(function (error) {
                console.log("error",error);
                $rootScope.$broadcast('loading:hide');

            });

        }
        else{
            if($scope.current_page <= $scope.total_page){
                index.search(
                    filterText, {
                        hitsPerPage: 5,
                        facets: '*',
                        maxValuesPerFacet: 10,
                        page:++$scope.current_page
                    }).then(
                    function(content){
                        angular.forEach(content.hits,function(obj){
                            $scope.packages.push(obj);
                        });
                        $rootScope.$broadcast('loading:hide');
                    }
                ).catch(function (error) {
                    console.log("error",error);
                    $rootScope.$broadcast('loading:hide');

                });
            }
            return;
        }
    };

    $scope.search_packages($scope.filterText,false);


    $scope.load_more = function(){
        $scope.search_packages($scope.filterText,true);
    };
    
    $scope.productDescription = function(id){
        $state.go('app.product_desc',{'product_id':id})
    };


    $scope.price_list = true;
    $scope.sorting_value = false;
    $scope.price_range = [];
    $scope.choice={
        val:-1
    };
    var stringFilter = '';
    $scope.filter = {price: false};

    $ionicModal.fromTemplateUrl('templates/home/html/search_sort_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openSortAndFilterModal = function () {
        $scope.modal.show();
    };
    $scope.closeSortAndFilterModal = function () {
        $scope.modal.hide();
    };

    $scope.price_list_option = function () {
        $scope.price_list = true;
        $scope.sorting_value = false;
    };
    $scope.sorting_option = function () {
        $scope.price_list = false;
        $scope.sorting_value = true;

    };

    MaxPriceService.getMaxPrice().then(function (data) {
        $scope.max_price = data.data.data;
        $scope.range = {};
        $scope.range.from = 0;
        $scope.range.to = parseInt($scope.max_price);
        $scope.RangeOptions = {
            floor: 0,
            ceil: $scope.max_price,
            step: 500
        };
    });
    $scope.makefilters = function () {

        var my_maximum = Math.max.apply(null, $scope.price_range);
        var my_minimum = Math.min.apply(null, $scope.price_range);
        console.log('min ' + my_minimum);
        console.log('max ' + my_maximum);
        stringFilter = "deal_price : " + my_minimum + " TO " + my_maximum;

    }
    $scope.filter_apply = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('candybrush_packages');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();

                console.log(JSON.stringify($scope.packages));
            }
        ).catch(function (error) {
            console.log("error",error);
        });
        // ,
        //     searchCallback
        // );
        //
        // function searchCallback(err, content) {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     $scope.packages = content.hits;
        //     $scope.closeSortAndFilterModal();
        //
        //     console.log(JSON.stringify($scope.packages));
        //
        // }

    };
    $scope.pricehtol = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('deal_price_desc');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();

                console.log(JSON.stringify($scope.packages));
            }
        ).catch(function (error) {
            console.log("error",error);
        });

    };
    $scope.priceltoh = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('deal_price_asc');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();

                console.log(JSON.stringify($scope.packages));
            }
        ).catch(function (error) {
            console.log("error",error);
        });
           

    };
    $scope.newfirst = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('new_packages_first');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();

                console.log(JSON.stringify($scope.packages));
            }
        ).catch(function (error) {
            console.log("error",error);
        });
    };

    $scope.addPrice = function (initial, final) {
        console.log($scope.filter);
        $scope.price_range = [];
        if ($scope.filter.price1) {
            $scope.price_range.push(0, 1000);
        }
        if ($scope.filter.price2) {
            $scope.price_range.push(1001, 10000);
        }
        if ($scope.filter.price3) {
            $scope.price_range.push(10001, 50000);
        }
        if ($scope.filter.price4) {
            $scope.price_range.push(50001, 100000);
        }
        if ($scope.filter.price5) {
            $scope.price_range.push(100001, $scope.max_price);
        }
        $scope.makefilters();
    };
    $scope.makeSort=function(val){
        switch($scope.choice.val){
            case 1:{$scope.pricehtol();
                break;}
            case 2:{$scope.priceltoh();break;}
            case 3:{$scope.newfirst();break;}
        }
    }
    
});
