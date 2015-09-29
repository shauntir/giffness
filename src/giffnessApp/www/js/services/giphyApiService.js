(function() {
  'use strict';

  angular.module('giffnessApp').factory('giphyApiService', ['$http', '$q', '$ionicLoading', giphyApiService]);

  function giphyApiService($http, $q, $ionicLoading) {

    //Move this to a config file and get values from another service
    self.baseURI = 'https://api.giphy.com/';
    self.randomBaseURI = 'https://tv.giphy.com/';
    self.apiURIPath = 'v1/gifs/';
    self.apiKeyParam = '?api_key=dc6zaTOxFJmzC';

    //Private helper method to build request URI
    function buildApiRequest(requestParameterType) {
      var fullURI;

      if(requestParameterType === 'random') {
        fullURI = self.randomBaseURI;
      }
      else {
        fullURI = self.baseURI;
      }
      fullURI += self.apiURIPath + requestParameterType + self.apiKeyParam;

      return fullURI;
    }

    //Get Trending Gifs
    function getTrendingGifs(limit, offset) {
      var requestURI = buildApiRequest('trending');
      var deferred = $q.defer();

      requestURI += '&limit=' + limit + '&offset='+ offset;

      $http.get(requestURI)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          console.log("Error trying to request trending gifs!");

          deferred.reject();
        });

      return deferred.promise;
    }

    //Search Gifs
    function searchGifs(searchCriteria, limit, offset) {
      var requestURI = buildApiRequest('search');
      var deferred = $q.defer();

      requestURI += '&q=' + searchCriteria + '&limit=' + limit + '&offset='+ offset;

      $http.get(requestURI)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          console.log("Error trying to search gifs!");

          deferred.reject();
        });

      return deferred.promise;
    }

    //Get Random Gif
    function getRandomGif() {
      var requestURI = buildApiRequest('random');
      var deferred = $q.defer();
      $http.defaults.useXDomain = true;
      $http.get(requestURI)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          console.log("Error trying to request random gifs!");

          deferred.reject();
        });

      return deferred.promise;
    }

    return {
      getTrendingGifs: getTrendingGifs,
      getRandomGif: getRandomGif,
      searchGifs: searchGifs
    };

  };

})();
