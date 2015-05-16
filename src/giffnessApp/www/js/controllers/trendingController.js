(function() {
  'use strict';

  angular.module('giffnessApp').controller('TrendingController', ['$state', '$scope', '$ionicModal', 'giphyApiService', 'giphyApiPrettifyService', trendingController]);

  function trendingController($state, $scope, $ionicModal, giphyApiService, giphyApiPrettifyService) {
    var viewModel = this;

    giphyApiService
      .getTrendingGifs()
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

      $scope.showGifModal = function(item) {
        $scope.modal.gif = item;
        $scope.modal.show();
      };

  };

})();
