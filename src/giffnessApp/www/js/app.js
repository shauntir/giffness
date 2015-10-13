// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('giffnessApp', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $ionicPopup, $rootScope) {
  var hasOfflineCheckRun = false;
  var noConnectionPopup = function() {
    $ionicPopup.confirm({
        title: "No Internet Connection",
        content: "For viewing awesome gifs you need to have an internet connection.",
        okText: "Continue",
        cancelText: "Exit"
    })
    .then(function(result) {
        if(!result) {
            ionic.Platform.exitApp();
        }
    });
  };

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    //Check for internet connection
    $ionicPlatform.ready(function() {
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          hasOfflineCheckRun = true;
          $rootScope.isOffline = true;
          noConnectionPopup();
        }
      }

      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
        if (!hasOfflineCheckRun) {
          $rootScope.isOffline = true;
          noConnectionPopup();
          window.location.reload(true);
        }
      });

      $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
        $rootScope.isOffline = false;
        window.location.reload(true);
      });

    });

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('home', {
    url: "/home",
    abstract: true,
    templateUrl: "templates/home/home.html"
  })

  // Each tab has its own nav history stack:

  .state('home.trending', {
    url: '/trending',
    views: {
      'trending': {
        templateUrl: 'templates/home/trending.html',
        controller: 'TrendingController'
      }
    }
  })

  .state('home.random', {
      url: '/random',
      views: {
        'random': {
          templateUrl: 'templates/home/random.html',
          controller: 'RandomController'
        }
      }
    })

  .state('home.search', {
      url: '/search/:search_term',
      views: {
        'search': {
          templateUrl: 'templates/home/search.html',
          controller: 'SearchController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/trending');

});
