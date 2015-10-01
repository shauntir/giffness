(function() {
  'use strict';

  angular.module('giffnessApp').controller('TrendingController', ['$state', '$scope', '$ionicModal', 'giphyApiService', 'giphyApiPrettifyService', 'utilitiesHelperService', trendingController]);

  function trendingController($state, $scope, $ionicModal, giphyApiService, giphyApiPrettifyService, utilitiesHelperService) {
    var viewModel = this;
    var limit = 5;
    var offset = 0;

    giphyApiService
      .getTrendingGifs(limit, offset)
      .then(function(data) {
        viewModel.trendingGifs = giphyApiPrettifyService.getTrendingGifsPretty(data);
        $scope.trendingGifs = viewModel.trendingGifs;
      });


    $ionicModal
      .fromTemplateUrl('gif-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        $scope.modal = modal;
      });

    viewModel.shareGif = function(randomGif) {
      utilitiesHelperService.shareGif(randomGif);
    };

    $scope.showGifModal = function(item) {
      $scope.modal.gif = item;
      $scope.modal.show();
    };


    $scope.getMoreGifs = function() {
      offset += limit;
      giphyApiService
        .getTrendingGifs(limit, offset)
        .then(function(data) {
          viewModel.trendingGifs = viewModel.trendingGifs.concat(giphyApiPrettifyService.getTrendingGifsPretty(data));
          $scope.trendingGifs = viewModel.trendingGifs;
        });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

  };

})();
