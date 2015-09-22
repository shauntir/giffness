(function() {
  'use strict';

  angular.module('giffnessApp').controller('RandomController', ['$scope', 'giphyApiService', 'giphyApiPrettifyService', '$cordovaFileTransfer', randomController]);

  function randomController($scope, giphyApiService, giphyApiPrettifyService, $cordovaFileTransfer) {
    var viewModel = this;

    var requestRandomGif = function() {
      giphyApiService
        .getRandomGif()
        .then(function(data) {
          viewModel.randomGif = giphyApiPrettifyService.getRandomGifPretty(data);
        });
    };

    viewModel.saveGif = function() {
      var deviceTargetPath = cordova.file.dataDirectory + 'giffness/';

      var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
      var trustHosts = true
      var options = {};

      $cordovaFileTransfer.download(url, deviceTargetPath, options, trustHosts)
        .then(function(result) {
          alert('success');
        }, function(err) {
          alert('erore');
        });

     

    };


    viewModel.getAnotherRandomGif = function() {
      requestRandomGif();
    };

    requestRandomGif();
  };

})();
