// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'ngFileUpload', 'ngStorage', ])

.config(function ($ionicConfigProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function ($ionicPlatform, $ionicPopup, $interval) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                    title: "Network error",
                    content: "No Internet connection"
                })
                .then(function (result) {
                    if (!result) {
                        ionic.Platform.exitApp();
                    }
                });
            }
        }


        $ionicPlatform.registerBackButtonAction(function (event) {
            if (true) { // your check here
                $ionicPopup.confirm({
                    title: 'Exit BJP AP APP?',
                    template: 'Are you sure you want to exit?'
                }).then(function (res) {
                    if (res) {
                        debugger;
                        ionic.Platform.exitApp();
                    }
                })
            }
        }, 101);
    });
})

.directive('awLimitLength', function () {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            attrs.$set("ngTrim", "false");
            var limitLength = parseInt(attrs.awLimitLength, 10);// console.log(attrs);
            scope.$watch(attrs.ngModel, function(newValue) {
                if(ngModel.$viewValue.length>limitLength){
                    ngModel.$setViewValue( ngModel.$viewValue.substring(0, limitLength ) );
                    ngModel.$render();
                }
            });
        }
    };
})
/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('textOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^A-Za-z ]/g, '');
                console.log(transformedInput);
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function ($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])
 .directive('numbersOnly', function () {
     return {
         require: 'ngModel',
         link: function (scope, element, attr, ngModelCtrl) {
             function fromUser(text) {
                 if (text) {
                     var transformedInput = text.replace(/[^0-9-]/g, '');
                     if (transformedInput !== text) {
                         ngModelCtrl.$setViewValue(transformedInput);
                         ngModelCtrl.$render();
                     }
                     return transformedInput;
                 }
                 return undefined;
             }
             ngModelCtrl.$parsers.push(fromUser);
         }
     };
 })
    .directive('ionNetwork', function ($interval) {
        return {
            restrict: 'A',
            scope: {
                interval: '@?ionNetwork'
            },
            link: function (scope, element) {
                if (window.cordova) {
                    var allowedNetworkStates = [Connection.WIFI, Connection.CELL_4G, Connection.CELL_3G, Connection.CELL_2G];
                    var disabledTags = ['input', 'button', 'textarea', 'select'];
                    var tag = element[0].tagName.toLowerCase();
                    scope.interval = parseInt(scope.interval) || 500;

                    function checkNetworkState() {
                        if (allowedNetworkStates.indexOf(navigator.connection.type) === -1) {
                            if (disabledTags.indexOf(tag) !== -1) {
                                element[0].disabled = true;
                            }
                            element.removeClass('online');
                            element.addClass('offline');
                        } else {
                            if (disabledTags.indexOf(tag) !== -1) {
                                element[0].disabled = false;
                            }
                            element.removeClass('offline');
                            element.addClass('online');
                        }
                    }

                    checkNetworkState();
                    stop = $interval(checkNetworkState, scope.interval);

                    scope.$on('$destroy', function () {
                        $interval.cancel(stop);
                    });
                }
            }
        };
    })

    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]) //
/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('restrictField', function () {
    return {
        restrict: 'AE',
        scope: {
            restrictField: '='
        },
        link: function (scope) {
            // this will match spaces, tabs, line feeds etc
            // you can change this regex as you want
            var regex = /\s/g;

            scope.$watch('restrictField', function (newValue, oldValue) {
                if (newValue != oldValue && regex.test(newValue)) {
                    scope.restrictField = newValue.replace(regex, '');
                }
            });
        }
    };
})
    .directive('onlyAlphabets', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^0-9a-zA-Z\-\s]/g, '');
                    console.log(transformedInput);
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput; // or return Number(transformedInput)
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
.directive('hrefInappbrowser', function () {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function (scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];

            attrs.$observe('hrefInappbrowser', function (val) {
                href = val;
            });

            element.bind('click', function (event) {

                window.open(href, '_system', 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
});