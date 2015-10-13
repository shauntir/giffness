(function() {
  'use strict';

  angular.module('giffnessApp').controller('SearchController', ['$scope', '$ionicModal', 'giphyApiService', 'giphyApiPrettifyService', 'utilitiesHelperService',searchController]);

  function searchController($scope, $ionicModal, giphyApiService, giphyApiPrettifyService, utilitiesHelperService) {
    var viewModel = this;
    var limit = 5;
    var offset = 0;

    $scope.hasSearch = false;
    $scope.noSearchResults = false;

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

    $scope.getMoreGifs = function(searchCriteria) {
      if(searchCriteria && $scope.hasSearch === true) {
        offset += limit;
        giphyApiService
          .searchGifs(searchCriteria, limit, offset)
          .then(function(data) {
            if(data.data.length === 0) {
              $scope.noSearchResults = true;
              $scope.hasSearch = false;
            }
            else {
              viewModel.Gifs = viewModel.Gifs.concat(giphyApiPrettifyService.getTrendingGifsPretty(data));
              $scope.Gifs = viewModel.Gifs;

              $scope.hasSearch = true;
              $scope.noSearchResults = false;
            }
          });
       $scope.$broadcast('scroll.infiniteScrollComplete'); 
        
      }
      
    };

    viewModel.searchGifs = function(searchCriteria) {
      var limit = 5;
      var offset = 0;

      giphyApiService
        .searchGifs(searchCriteria, limit, offset)
        .then(function(data) {
          viewModel.Gifs = giphyApiPrettifyService.getTrendingGifsPretty(data);


          if(data.data.length === 0) {
            $scope.noSearchResults = true;
            $scope.hasSearch = false;
          }
          else {
            $scope.Gifs = viewModel.Gifs;
            $scope.hasSearch = true;
            $scope.noSearchResults = false;
          }
        });
    };

  };

})();
