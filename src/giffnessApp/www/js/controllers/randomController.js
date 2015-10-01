(function() {
  'use strict';

  angular.module('giffnessApp').controller('RandomController', ['$scope', 'giphyApiService', 'giphyApiPrettifyService', 'utilitiesHelperService', randomController]);

  function randomController($scope, giphyApiService, giphyApiPrettifyService, utilitiesHelperService) {
    var viewModel = this;

    var requestRandomGif = function() {
      giphyApiService
        .getRandomGif()
        .then(function(data) {
          viewModel.randomGif = giphyApiPrettifyService.getRandomGifPretty(data);
        });
    };

    viewModel.getAnotherRandomGif = function() {
      requestRandomGif();
    };

    viewModel.shareGif = function(randomGif) {
      utilitiesHelperService.shareGif(randomGif);
    };

    requestRandomGif();
  };

})();
