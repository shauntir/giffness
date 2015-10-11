(function() {
  'use strict';

  angular.module('giffnessApp').controller('TrendingController', ['$window', '$state', '$scope', '$ionicModal', 'giphyApiService', 'giphyApiPrettifyService', 'utilitiesHelperService', '$cordovaFileTransfer', '$cordovaFile', '$ionicLoading', trendingController]);

  function trendingController($window, $state, $scope, $ionicModal, giphyApiService, giphyApiPrettifyService, utilitiesHelperService, $cordovaFileTransfer, $cordovaFile, $ionicLoading) {
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

/*
    viewModel.downloadGif = function(randomGif) {

      ionic.Platform.ready(function() {
        var url = randomGif.fixedWidthStillUrl;
        var targetPath = LocalFileSystem.PERSISTENT + randomGif.title + ".gif";
        var trustHosts = true
        var options = {};
        alert(targetPath);

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function(result) {
                  alert('done: ' + targetPath);
          }, function(err) {
            // Error
                  alert('error');
          }, function (progress) {
            //$timeout(function () {
            //  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            //})
          });
      });
alert('fin');
    };
    */
/*
    viewModel.downloadGif = function(randomGif) {
      ionic.Platform.ready(function() {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            fs.root.getDirectory(
                "ExampleProject",
                {
                    create: true
                },
                function(dirEntry) {
                    dirEntry.getFile(
                        "test.png",
                        {
                            create: true,
                            exclusive: false
                        },
                        function gotFileEntry(fe) {
                            var p = fe.toURL();
                            fe.remove();
                            ft = new FileTransfer();
                            ft.download(
                                encodeURI("http://ionicframework.com/img/ionic-logo-blog.png"),
                                p,
                                function(entry) {
                                    $ionicLoading.hide();
                                    $scope.imgFile = entry.toURL();
                                },
                                function(error) {
                                    $ionicLoading.hide();
                                    alert("Download Error Source " + error.source);
                                },
                                false,
                                null
                            );
                        },
                        function() {
                            alert('error file');
                        }
                    );
                }
            );
        },
        function() {

          alert('errpr');
        });
      });
    };
*/
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
