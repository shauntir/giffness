(function() {
  'use strict';

  angular.module('giffnessApp').controller('TrendingController', ['$state', 'giphyApiService', 'giphyApiPrettifyService', trendingController]);

  function trendingController($state, giphyApiService, giphyApiPrettifyService) {
    var viewModel = this;

      giphyApiService
        .getTrendingGifs()
        .then(function(data) {
           viewModel.trendingGifs = giphyApiPrettifyService.getTrendingGifsPretty(data);
        });

  };

})();
