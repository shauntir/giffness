(function() {
  'use strict';

  angular.module('giffnessApp').controller('RandomController', ['$scope', 'giphyApiService', 'giphyApiPrettifyService', '$cordovaSocialSharing', randomController]);

  function randomController($scope, giphyApiService, giphyApiPrettifyService, $cordovaSocialSharing) {
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
      ionic.Platform.ready(function() {
        $cordovaSocialSharing
            .share(null, "Hi! I just wanted to share this awesome gif with you.", randomGif.imageUrl, null)
            .then(function(result) {
              // Move along, nothing to see here.
            }, function(err) {
              // An error occured. Show a message to the user
            });
      });
    };

    requestRandomGif();
  };

})();
