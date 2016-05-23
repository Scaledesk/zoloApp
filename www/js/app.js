//
//Welcome to app.js
//This is main application config of project. You can change a setting of :
//  - Global Variable
//  - Theme setting
//  - Icon setting
//  - Register View
//  - Spinner setting
//  - Custom style
//
//Global variable use for setting color, start page, message, oAuth key.
var db = null; //Use for SQLite database.
window.globalVariable = {
    //custom color style variable
    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },// End custom color style variable
    startPage: {
        url: "/app/dashboard",//Url of start page.
        state: "app.dashboard"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
        dropbox: "your_api_key",//Use for Dropbox API clientID.
        facebook: "your_api_key",//Use for Facebook API appID.
        foursquare: "your_api_key", //Use for Foursquare API clientID.
        instagram: "your_api_key",//Use for Instagram API clientID.
        googlePlus: "your_api_key",//Use for Google API clientID.
    },
    adMob: "your_api_key" //Use for AdMob API clientID.
};// End Global variable



angular.module('starter', ['ionic','ngIOS9UIWebViewPatch', 'starter.controllers', 'starter.services', 'ngMaterial',
        'ionic.contrib.drawer','ngMessages', 'ngCordova','satellizer','checklist-model','algoliasearch'])
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {

        //Create database table of contracts by using sqlite database.
        //Table schema :
        //Column	   Type	     Primary key
        //  id	        Integer	    Yes
        //  firstName	Text	    No
        //  lastName	Text	    No
        //  telephone	Text	    No
        //  email	    Text	    No
        //  note	    Text	    No
        //  createDate	DateTime	No
        //  age	        Integer	    No
        //  isEnable	Boolean	    No

        function initialSQLite() {
            db = window.cordova ? $cordovaSQLite.openDB("contract.db") : window.openDatabase("contract.db", "1.0", "IonicMaterialDesignDB", -1);
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contracts " +
                "( id           integer primary key   , " +
                "  firstName    text                  , " +
                "  lastName     text                  , " +
                "  telephone    text                  , " +
                "  email        text                  , " +
                "  note         text                  , " +
                "  createDate   dateTime              , " +
                "  age          integer               , " +
                "  isEnable     Boolean)                ");
        };
        // End creating SQLite database table.

        // Create custom defaultStyle.
        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }// End create custom defaultStyle

        // Create custom style for product view.
        function getProductStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important;" +
                "   border-style            : none;" +
                "   background-image        : url('img/background_cover_pixels.png') !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }// End create custom style for product view.

        // Create custom style for contract us view.
        function getContractUsStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : transparent !important;" +
                "   border-style            : none;" +
                "   background-image        : none !important;" +
                "   background-position-y   : 4px !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        } // End create custom style for contract us view.

        // Create custom style for Social Network view.
        function getSocialNetworkStyle(socialColor) {
            return "" +
                ".material-background-nav-bar {" +
                "   background              : " + socialColor + " !important;" +
                "   border-style            : none;" +
                "} " +
                "md-ink-bar {" +
                "   color                   : " + socialColor + " !important;" +
                "   background              : " + socialColor + " !important;" +
                "}" +
                "md-tab-item {" +
                "   color                   : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-left .md-half-circle {" +
                "   border-left-color       : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
                "    border-top-color       : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-gap {" +
                "   border-top-color        : " + socialColor + " !important;" +
                "   border-bottom-color     : " + socialColor + " !important;" +
                "}" +
                "md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
                "  border-right-color       : " + socialColor + " !important;" +
                " }" +
                ".spinner-android {" +
                "   stroke                  : " + socialColor + " !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                   : " + socialColor + " !important;" +
                "}" +
                "a.md-button.md-primary, .md-button.md-primary {" +
                "   color                   : " + socialColor + " !important;" +
                "}";
        }// End create custom style for Social Network view.


        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };

        function hideActionControl() {
            //For android if user tap hardware back button, Action and Dialog should be hide.
            $mdBottomSheet.cancel();
            $mdDialog.cancel();
        };


        // createCustomStyle will change a style of view while view changing.
        // Parameter :
        // stateName = name of state that going to change for add style of that page.
        function createCustomStyle(stateName) {
            var customStyle =
                ".material-background {" +
                "   background-color          : " + appPrimaryColor + " !important;" +
                "   border-style              : none;" +
                "}" +
                ".spinner-android {" +
                "   stroke                    : " + appPrimaryColor + " !important;" +
                "}";

            switch (stateName) {
                case "app.productList" :
                case "app.productDetail":
                case "app.productCheckout":
                case "app.clothShop" :
                case "app.catalog" :
                    customStyle += getProductStyle();
                    break;
                case "app.dropboxLogin" :
                case "app.dropboxProfile":
                case "app.dropboxFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.dropboxColor);
                    break;
                case "app.facebookLogin" :
                case "app.facebookProfile":
                case "app.facebookFeed" :
                case "app.facebookFriendList":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.facebookColor);
                    break;
                case "app.foursquareLogin" :
                case "app.foursquareProfile":
                case "app.foursquareFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.foursquareColor);
                    break;
                case "app.googlePlusLogin" :
                case "app.googlePlusProfile":
                case "app.googlePlusFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.googlePlusColor);
                    break;
                case "app.instagramLogin" :
                case "app.instagramProfile":
                case "app.instagramFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.instagramColor);
                    break;
                case "app.wordpressLogin" :
                case "app.wordpressFeed":
                case "app.wordpressPost" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.wordpressColor);
                    break;
                case "app.contractUs":
                    customStyle += getContractUsStyle();
                    break;
                default:
                    customStyle += getDefaultStyle();
                    break;
            }
            return customStyle;
        }// End createCustomStyle

        // Add custom style while initial application.
        $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);

        $ionicPlatform.ready(function () {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            initialSQLite();
            initialRootScope();

            //Checking if view is changing it will go to this function.
            $rootScope.$on('$ionicView.beforeEnter', function () {
                //hide Action Control for android back button.
                hideActionControl();
                // Add custom style ti view.
                $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
            });
        });
    })
    .config(
        function ($authProvider, serverConfig) {
            $authProvider.httpInterceptor = function() { return true; },
                $authProvider.tokenName = 'access_token';
            $authProvider.google({
                url: serverConfig.address + 'api/auth/google',
                // clientId: '982638547625-ui0lp1pteh6moug1sgct1ag0ub0aen7g.apps.googleusercontent.com',
                clientId: '936213911318-1mnllojl5hqu2b4o17e47hpbk2e4s66c.apps.googleusercontent.com',
                clientSecret: '3_FHOlRYTrJffGBhGAMr59b_',
                // redirectUri: 'http://'+location.hostname+'/'
                // redirectUri: 'http://localhost/'
            });
            $authProvider.facebook({
                url: serverConfig.address + 'api/auth/facebook',
                clientId: '953913041345816',
                clientSecret: 'e9652fa4cea1dca0a1d6658adaa0ab36',
                // redirectUri: 'http://'+'192.168.1.4:8100/'
            });
            $authProvider.loginUrl = serverConfig.address + 'oauth/access_token';
        })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {
        // Use for change ionic spinner to android pattern.
        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

        // mdIconProvider is function of Angular Material.
        // It use for reference .SVG file and improve performance loading.
        $mdIconProvider
            .icon('facebook', 'img/icons/facebook.svg')
            .icon('twitter', 'img/icons/twitter.svg')
            .icon('mail', 'img/icons/mail.svg')
            .icon('message', 'img/icons/message.svg')
            .icon('share-arrow', 'img/icons/share-arrow.svg')
            .icon('more', 'img/icons/more_vert.svg');

        //mdThemingProvider use for change theme color of Ionic Material Design Application.
        /* You can select color from Material Color List configuration :
         * red
         * pink
         * purple
         * purple
         * deep-purple
         * indigo
         * blue
         * light-blue
         * cyan
         * teal
         * green
         * light-green
         * lime
         * yellow
         * amber
         * orange
         * deep-orange
         * brown
         * grey
         * blue-grey
         */
        //Learn more about_us material color patten: https://www.materialpalette.com/
        //Learn more about_us material theme: https://material.angularjs.org/latest/#/Theming/01_introduction
        $mdThemingProvider
            .theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('pink');

        appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"]; //Use for get base color of theme.

        //$stateProvider is using for add or edit HTML view to navigation bar.
        //
        //Schema :
        //state_name(String)      : Name of state to use in application.
        //page_name(String)       : Name of page to present at localhost url.
        //cache(Bool)             : Cache of view and controller default is true. Change to false if you want page reload when application navigate back to this view.
        //html_file_path(String)  : Path of html file.
        //controller_name(String) : Name of Controller.
        //
        //Learn more about_us ionNavView at http://ionicframework.com/docs/api/directive/ionNavView/
        //Learn more about_us  AngularUI Router's at https://github.com/angular-ui/ui-router/wiki
        $stateProvider
            .state('get_started',{
                url: "/mainWalkthrough",
                templateUrl: "templates/MainWalkthrough/html/mainWalkthrough.html",
                controller: 'mainWalkthroughCtrl'
            })
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/index.html",
                controller: 'MenuCtrl'
            })
            .state('app.categoryPage', {
                url: "/categoryPage?id",
                params:{
                    isAnimated:false,
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/category-page/html/category-page.html",
                        controller: 'categoryPageCtrl'
                    }
                }
            })
            .state('app.signUp', {
                url: "/signUp",
                params:{
                    isAnimated:false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/sign-up/html/sign-up.html",
                        controller: 'signUpController'
                    }
                }
            })
            .state('app.packages', {
                url: "/packages",
                params:{
                    isAnimated:false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/packages/html/packageList.html",
                        controller: 'packageController'
                    }
                }
            })
            .state('app.dashboard', {
                url: "/dashboard",
                params:{
                    isAnimated:false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/material-user-interface/dashboard/html/dashboard.html",
                        controller: 'dashboardCtrl'
                    }
                }
            })
            .state('app.myAccountMenu', {
                url: "/myAccountMenu",
                views: {
                    'menuContent': {
                        templateUrl: "templates/material-user-interface/my-account-menu/html/my-account-menu.html",
                        controller: "dashboardSettingCtrl"
                    }
                }
            })
            .state('app.dashboardSetting', {
                url: "/dashboardSetting",
                views: {
                    'menuContent': {
                        templateUrl: "templates/material-user-interface/dashboard/html/dashboard-setting.html",
                        controller: "dashboardSettingCtrl"
                    }
                }
            })
            .state('app.contractlist', {
                url: "/contractlist",
                cache: false,
                params:{
                    isAnimated:true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/application-storage/sqLite/html/contract-list.html",
                        controller: 'contractListCtrl'
                    }
                }
            })
            .state('app.contractdetail', {
                url: "/contractdetail",
                params: {
                    contractdetail: null,
                    actionDelete: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/application-storage/sqLite/html/contract-detail.html",
                        controller: 'contractDetailCtrl'
                    }
                }
            })
            .state('app.contractsetting', {
                url: "/contractsetting",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/application-storage/sqLite/html/contract-setting.html",
                        controller: 'contractSettingCtrl'
                    }
                }
            })
            .state('app.notelist', {
                url: "/notelist",
                params:{
                    isAnimated:false
                },
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/application-storage/local-application-db/html/note-list.html",
                        controller: 'noteListCtrl'
                    }
                }
            })
            .state('app.notedetail', {
                url: "/notedetail",
                params: {
                    noteDetail: null,
                    actionDelete: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/application-storage/local-application-db/html/note-detail.html",
                        controller: 'noteDetailCtrl'
                    }
                }
            })
            .state('app.notesetting', {
                url: "/notesetting",
                views: {
                    'menuContent': {
                        templateUrl: "templates/application-storage/local-application-db/html/note-setting.html",
                        controller: 'noteSettingCtrl'
                    }
                }
            })
            .state('app.facebookLogin', {
                url: "/facebookLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/facebook/html/facebook-login.html",
                        controller: 'facebookLoginCtrl'
                    }
                }
            })
            .state('app.facebookProfile', {
                url: "/facebookProfile",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/facebook/html/facebook-profile.html",
                        controller: 'facebookProfileCtrl'
                    }
                }
            })
            .state('app.facebookFeed', {
                url: "/facebookFeed",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/facebook/html/facebook-feed.html",
                        controller: 'facebookFeedCtrl'
                    }
                }
            })
            .state('app.facebookFriendList', {
                url: "/facebookFriendList",
                cache: false,
                params: {
                    access_token: null,
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/facebook/html/facebook-friend-list.html",
                        controller: 'facebookFriendListCtrl'
                    }
                }
            })
            .state('app.googlePlusLogin', {
                url: "/googlePlusLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/google-plus/html/google-login.html",
                        controller: 'googlePlusLoginCtrl'
                    }
                }
            })
            .state('app.googlePlusProfile', {
                url: "/googlePlusProfile",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/google-plus/html/google-profile.html",
                        controller: 'googlePlusProfileCtrl'
                    }
                }
            })
            .state('app.googlePlusFeed', {
                url: "/googlePlusFeed",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/google-plus/html/google-feed.html",
                        controller: 'googlePlusFeedCtrl'
                    }
                }
            })
            .state('app.instagramLogin', {
                url: "/instagramLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/instagram/html/instagram-login.html",
                        controller: 'instagramLoginCtrl'
                    }
                }
            })
            .state('app.instagramProfile', {
                url: "/instagramProfile",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/instagram/html/instagram-profile.html",
                        controller: 'instagramProfileCtrl'
                    }
                }
            })
            .state('app.instagramFeed', {
                url: "/instagramFeed",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/instagram/html/instagram-feed.html",
                        controller: 'instagramFeedCtrl'
                    }
                }
            })
            .state('app.foursquareLogin', {
                url: "/foursquareLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/foursquare/html/foursquare-login.html",
                        controller: 'foursquareLoginCtrl'
                    }
                }
            })
            .state('app.foursquareProfile', {
                url: "/foursquareProfile",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/foursquare/html/foursquare-profile.html",
                        controller: 'foursquareProfileCtrl'
                    }
                }
            })
            .state('app.foursquareFeed', {
                url: "/foursquareFeed",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/foursquare/html/foursquare-feed.html",
                        controller: 'foursquareFeedCtrl'
                    }
                }
            })
            .state('app.dropboxLogin', {
                url: "/dropboxLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/dropbox/html/dropbox-login.html",
                        controller: 'dropboxLoginCtrl'
                    }
                }
            })
            .state('app.dropboxProfile', {
                url: "/dropboxProfile",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/dropbox/html/dropbox-profile.html",
                        controller: 'dropboxProfileCtrl'
                    }
                }
            })
            .state('app.dropboxFeed', {
                url: "/dropboxFeed",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/dropbox/html/dropbox-feed.html",
                        controller: 'dropboxFeedCtrl'
                    }
                }
            })
            .state('app.fakeLogin', {
                url: "/fakeLogin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/authentication/html/fake-login.html"
                    }
                }
            })
            .state('app.fakeSignUp', {
                url: "/fakeSignUp",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/authentication/html/fake-sign-up.html"
                    }
                }
            })
            .state('app.productList', {
                url: "/productList",
                views: {
                    'menuContent': {
                        templateUrl: "templates/share-application-content/social-share/html/product-list.html",
                        controller: 'productListCtrl'
                    }
                }
            })
            .state('app.productDetail', {
                url: "/productDetail",
                params: {
                    product: null,
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/share-application-content/social-share/html/product-detail.html",
                        controller: 'productDetailCtrl'
                    }
                }
            })
            .state('app.productCheckout', {
                url: "/productCheckout",
                views: {
                    'menuContent': {
                        templateUrl: "templates/share-application-content/social-share/html/product-checkout.html",
                        controller: 'productCheckoutCtrl'
                    }
                }
            })
            .state('app.contractUs', {
                url: "/contractUs",
                views: {
                    'menuContent': {
                        templateUrl: "templates/share-application-content/email-message/html/contract-us.html",
                        controller: 'contractUsCtrl'
                    }

                }
            })
            .state('app.deviceInformation', {
                url: "/deviceInformation",
                views: {
                    'menuContent': {
                        templateUrl: "templates/hardware-connect/device-information/html/device-information.html",
                        controller: 'deviceInformationCtrl'
                    }

                }
            })
            .state('app.mobileContractList', {
                url: "/mobileContractList",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/hardware-connect/mobile-contract/html/mobile-contract-list.html",
                        controller: 'mobileContractListCtrl'
                    }

                }
            })
            .state('app.mobileContractDetail', {
                url: "/mobileContractDetail",
                params: {
                    contractDetail: null,
                    actionDelete: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/hardware-connect/mobile-contract/html/mobile-contract-detail.html",
                        controller: 'mobileContractDetailCtrl'
                    }

                }
            })
            .state('app.flashLight', {
                url: "/flashLight",
                views: {
                    'menuContent': {
                        templateUrl: "templates/hardware-connect/flash-light/html/flash-light.html",
                        controller: 'flashLightCtrl'
                    }

                }
            })
            .state('app.vibration', {
                url: "/vibration",
                views: {
                    'menuContent': {
                        templateUrl: "templates/hardware-connect/vibration/html/vibration.html",
                        controller: 'vibrationCtrl'
                    }

                }
            })
            .state('app.googleAdmob', {
                url: "/googleAdmob",
                views: {
                    'menuContent': {
                        templateUrl: "templates/advertising-application/googleAdmob/html/googleAdmob.html",
                        controller: 'googleAdmobCtrl'
                    }

                }
            })
            .state('app.imagePicker', {
                url: "/imagePicker",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/hardware-connect/image-picker/html/image-picker.html",
                        controller: 'imagePickerCtrl'
                    }

                }
            })

            .state('app.wordpressFeed', {
                url: "/wordpressFeed",
                params: {
                    wordpressUrl: null
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/wordpress/html/wordpress-feed.html",
                        controller: 'wordpressFeedCtrl'
                    }

                }
            })
            .state('app.wordpressLogin', {
                url: "/wordpressLogin",
                cache: false,
                params: {
                    isShowError: false
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/wordpress/html/wordpress-login.html",
                        controller: 'wordpressLoginCtrl'
                    }

                }
            })
            .state('app.wordpressPost', {
                url: "/wordpressPost",
                cache: false,
                params: {
                    postDetail: null,
                    wordpressUrl: null
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/social-network-connect/wordpress/html/wordpress-post.html",
                        controller: 'wordpressPostCtrl'
                    }

                }
            })
            .state('app.defaultUI', {
                url: "/defaultUI",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/material-user-interface/default-user-interface/html/default-user-interface.html",
                        controller: 'defaultUserInterfaceCtrl'
                    }

                }
            })
            .state('app.tryApp', {
                url: "/tryApp",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/try-app/html/try-app.html"
                    }
                }
            })
            .state('app.tryAppNoBackBtn', {
                url: "/tryAppNoBackBtn",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/try-app/html/try-app-no-back-btn.html"
                    }
                }
            })
            .state('app.pricing', {
                url: "/pricing",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/pricing/html/pricing.html"
                    }
                }
            })
            .state('app.menuDashboard', {
                url: "/menuDashboard",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/menu-dashboard/html/menu-dashboard.html",
                        controller: "menuDashboardCtrl"
                    }
                }
            })
            .state('app.expense', {
                url: "/expense",
                params:{
                    isAnimated:true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/expense-dashboard/html/expense-dashboard.html",
                        controller: "expenseDashboardCtrl"
                    }
                }
            })
            .state('app.expenseSetting', {
                url: "/expenseSetting",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/expense-dashboard/html/expense-dashboard-setting.html",
                        controller: "expenseDashboardSettingCtrl"
                    }
                }
            })
           /* .state('app.newsFeed', {
                url: "/newsFeed",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/news-feed/html/category-page.html"
                    }
                }
            })*/
            .state('app.clothShop', {
                url: "/clothShop",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/cloth-shop/html/cloth-shop.html"
                    }
                }
            })
            .state('app.onlineCourse', {
                url: "/onlineCourse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/online-course/html/online-course.html"
                    }
                }
            })
            .state('app.catalog', {
                url: "/catalog",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/catalog/html/catalog.html",
                        controller: "catalogCtrl"
                    }
                }
            })
            .state('app.locationFeed', {
                url: "/locationFeed",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/location-feed/html/location-feed.html"
                    }
                }
            })
            .state('app.cubeFeed', {
                url: "/cubeFeed",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/cube-feed/html/cube-feed.html"
                    }
                }
            })
            .state('app.restaurant', {
                url: "/restaurant",
                views: {
                    'menuContent': {
                        templateUrl: "templates/themes/restaurant/html/restaurant.html"
                    }
                }
            })
            .state('app.singlePushNotification', {
                url: "/singlePushNotification",
                views: {
                    'menuContent': {
                        templateUrl: "templates/push-notification/single-push-notification/html/single-push-notification.html",
                        controller: "singlePushNotificationCtrl"
                    }
                }
            })
            .state('app.schedulePushNotification', {
                url: "/schedulePushNotification",
                views: {
                    'menuContent': {
                        templateUrl: "templates/push-notification/schedule-push-notification/html/schedule-push-notification.html",
                        controller: "schedulePushNotificationCtrl"
                    }
                }
            })
            .state('app.iosMapConnect', {
                url: "/iosMapConnect",
                views: {
                    'menuContent': {
                        templateUrl: "templates/map-and-location/ios-map-connect/html/ios-map-connect.html",
                        controller: "iosMapConnectCtrl"
                    }
                }
            })
            .state('app.androidMapConnect', {
                url: "/androidMapConnect",
                views: {
                    'menuContent': {
                        templateUrl: "templates/map-and-location/android-map-connect/html/android-map-connect.html",
                        controller: "androidMapConnectCtrl"
                    }
                }
            })
              .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/index.html",
                        controller: "homeCtrl"
                    }
                }
            })
            .state('app.subCategory', {
                url: "/subCategory/:cat_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/subCategory.html",
                        controller: "subCategoryCtrl"
                    }
                },
                resolve: {
                    cat_id: function($stateParams) {
                    }
                }
            })
            .state('app.orp', {
                url: "/orp",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/orp.html",
                        controller: "orderReviewCtrl"
                    }
                }
            })
            .state('app.search_info', {
                url: "/search_info/:search_text",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/search_result.html",
                        controller: "searchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                        console.log(JSON.stringify($stateParams))
                    }
                }
            })
            .state('app.subCategoryListing', {
                url: "/subCategoryListing/:category_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/subCategoryForMenu.html",
                        controller: "subCategoryListCtrl"
                    }
                },
                resolve: {
                    category_id: function($stateParams) {
                    }
                }
            })

            .state('app.package_list', {
                url: "/package_list/:sub_cat_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/packages.html",
                        controller: "packagesCtrl"
                    }
                },
                resolve: {
                    sub_cat_id: function($stateParams) {
                    }
                }
            })
            .state('app.add_address', {
                url: "/package_list",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/add_address.html",
                        controller: "addressCtrl"
                    }
                }
            })

            .state('app.package_list_menu', {
                url: "/package_list_menu/:sub_category_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/packageList.html",
                        controller: "packagesListCtrl"
                    }
                },
                resolve: {
                    sub_category_id: function($stateParams) {
                    }
                }
            })
           .state('app.allCategory', {
                url: "/allCategory",
                views: {
                    'menuContent': {
                         templateUrl: "templates/category/html/index.html",
                        controller: "CategoryCtrl"
                    }
                }
            })
            .state('app.about_us', {
                url: "/aboutUs",
                views: {
                    'menuContent': {
                        templateUrl: "templates/about_us/html/index.html"
                    }
                }
            })
            .state('app.contact_us', {
                url: "/contactUs",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contact_us/html/index.html"
                    }
                }
            })
            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login/html/index.html",
                        controller: "loginCtrl"
                    }
                }
            })
            .state('app.optional_index', {
                url: "/optional_index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp/html/optional.html",
                        controller:"optionalCtrl"
                    }
                }
            })
            .state('app.login_index', {
                url: "/login_index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp/html/login.html",
                        controller:"optionalLoginCtrl"
                    }
                }
            })
            .state('app.signUp_index', {
                url: "/signUp_index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp/html/signUp.html",
                        controller:"signUpCtrl"
                    }
                }
            })
            .state('app.forget_password', {
                url: "/forget_password",
                views: {
                    'menuContent': {
                        templateUrl: "templates/forget_password/html/index.html",
                        controller: "ForgetPasswordCtrl"
                    }
                }
            })
            .state('app.product_desc', {
                url: "/product_desc/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/pdp.html",
                        controller: "productDescriptionCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            
            .state('app.full_description', {
                url: "/full_description/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/full_description.html",
                        controller:"fullDescriptionCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.seller_profile', {
                url: "/seller_profile/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/seller_profile.html",
                        controller:"sellerProfileCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.product_description', {
                url: "/product_description/:des_product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/product_description.html",
                        controller: "productDesCtrl"
                    }
                },
                resolve: {
                    des_product_id: function($stateParams) {
                        console.log(JSON.stringify($stateParams))
                    }
                }
            });


        if(window.localStorage['SkipIntro']== 'true'){
            console.log("if");
            $urlRouterProvider.otherwise("app/home");
        }else{
            console.log(window.localStorage['SkipIntro']);
            console.log('else');
            $urlRouterProvider.otherwise("/mainWalkthrough");

        }

    })

.constant("serverConfig", {
    "address": "http://54.169.76.224/"
})

    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function($rootScope,$q) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show');
                    return config
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response
                },
                responseError:function(rejection) {
                    $rootScope.$broadcast('loading:hide');
                    return $q.reject(rejection);
                }
            }
        })
    })
.run(function($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template: '<div class="ui-progress-circular"><ion-spinner ng-if="!isAndroid" class="progress-circular"></ion-spinner><md-progress-circular ng-if="isAndroid" md-mode="indeterminate"></md-progress-circular></div>'})
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    })
})
;




