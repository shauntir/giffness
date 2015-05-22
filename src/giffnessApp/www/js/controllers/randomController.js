(function() {
  'use strict';

  angular.module('giffnessApp').controller('RandomController', ['giphyApiService', 'giphyApiPrettifyService', randomController]);

  function randomController(giphyApiService, giphyApiPrettifyService) {
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

    requestRandomGif();
  };

})();
