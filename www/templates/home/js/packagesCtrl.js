appControllers.controller('packagesCtrl', function ($scope, $timeout, $mdUtil, packagesService, $ionicModal,
                                                    MaxPriceService, $mdSidenav, $log, $ionicHistory, $state,
                                                    $stateParams, algolia) {

    $scope.price_list = true;
    $scope.sorting_value = false;
    $scope.price_range = [];
    $scope.choice={
        val:-1
    };
    var stringFilter = '';
    $scope.filter = {price: false};
    packagesService.getPackagesList($stateParams.sub_cat_id).then(function (data) {
        $scope.packages_list = data.data.data;
        $scope.packages = $scope.packages_list.Packages.data;
    });

    $scope.productDescription = function (id) {
        $state.go('app.product_desc', {'product_id': id})
    };
    $ionicModal.fromTemplateUrl('templates/home/html/search_package_short_modal.html', {
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
        console.log("4")
    };
    $scope.sorting_option = function () {
        $scope.price_list = false;
        $scope.sorting_value = true;

    };

    MaxPriceService.getMaxPrice().then(function (data) {
        $scope.max_price = data.data.data;
        console.log("max price", $scope.max_price);
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

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            },
            searchCallback
        );

        function searchCallback(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            $scope.packages = content.hits;
            $scope.closeSortAndFilterModal();

            console.log(JSON.stringify($scope.packages));

        }

    };
    $scope.pricehtol = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('deal_price_desc');

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            },
            searchCallback
        );

        function searchCallback(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            $scope.packages = content.hits;
            $scope.closeSortAndFilterModal();

            console.log(JSON.stringify($scope.packages));

        }

    };
    $scope.priceltoh = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('deal_price_asc');

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            },
            searchCallback
        );

        function searchCallback(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            $scope.packages = content.hits;
            $scope.closeSortAndFilterModal();

            console.log(JSON.stringify($scope.packages));

        }

    };
    $scope.newfirst = function (filter) {
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('new_packages_first');

        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            },
            searchCallback
        );

        function searchCallback(err, content) {
            if (err) {
                console.error(err);
                return;
            }
            $scope.packages = content.hits;
            $scope.closeSortAndFilterModal();
            console.log(JSON.stringify($scope.packages));

        }

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