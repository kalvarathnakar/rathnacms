angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


        .state('menu.registration', {
            url: '/page1',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/registration.html',
                    controller: 'registrationCtrl'
                }
            }
        })

    .state('menu.cart', {
        url: '/page2',
        views: {
            'side-menu21': {
                templateUrl: 'templates/cart.html',
                controller: 'cartCtrl'
            }
        }
    })

    .state('menu.changemobilenumber', {
        url: '/changemobilenumber',
        views: {
            'side-menu21': {
                templateUrl: 'templates/changemobilenumber.html',
                controller: 'changemobilenumberCtrl'
            }
        }
    })
   .state('menu.manageroles', {
       url: '/manageroles',
       views: {
           'side-menu21': {
               templateUrl: 'templates/manageroles.html',
               controller: 'managerolesCtrl'
           }
       }
   })
        .state('menu.reports', {
            url: '/reports',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/reports.html',
                    controller: 'reportsCtrl'
                }
            }
        })
    .state('menu.home', {
        url: '/home',
        views: {
            'side-menu21': {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            }
        }
    })
  .state('menu.myaccount', {
      url: '/myaccount',
      views: {
          'side-menu21': {
              templateUrl: 'templates/myaccount.html',
              controller: 'myaccountCtrl'
          }
      }
  })
    .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
    })
     .state('menu.login', {
         url: '/login',
         views: {
             'side-menu21': {
                 templateUrl: 'templates/login.html',
                 controller: 'loginCtrl'
             }
         }

     })
      .state('menu.changepassword', {
          url: '/changepassword',
          views: {
              'side-menu21': {
                  templateUrl: 'templates/changepassword.html',
                  controller: 'changepasswordCtrl'
              }
          }

      })
        .state('menu.demo', {
            url: '/demo',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/demo.html',
                    controller: 'demoCtrl'
                }
            }

        })
        .state('menu.events', {
            url: '/events',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/events.html',
                    controller: 'eventsCtrl'
                }
            }
        })
        .state('menu.superadmin', {
            url: '/superadmin',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/superadmin.html',
                    controller: 'superadminCtrl'
                }
            }
        })
       .state('menu.forgotpassword', {
           url: '/forgotpassword',

           views: {
               'side-menu21': {
                   templateUrl: 'templates/forgotpassword.html',
                   controller: 'forgotpasswordCtrl'
               }
           }

       })
      .state('menu.homeforlogin', {
          url: '/homeforlogin',
          views: {
              'side-menu21': {
                  templateUrl: 'templates/homeforlogin.html',
                  controller: 'homeforloginCtrl'
              }
          }
      })
    $urlRouterProvider.otherwise('/side-menu21/home')


});