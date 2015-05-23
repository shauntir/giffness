(function() {
  'use strict';

  angular.module('giffnessApp').controller('RandomController', ['$scope', 'giphyApiService', 'giphyApiPrettifyService', randomController]);

  function randomController($scope, giphyApiService, giphyApiPrettifyService) {
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
