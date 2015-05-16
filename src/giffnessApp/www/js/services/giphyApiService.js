(function() {
  'use strict';

  angular.module('giffnessApp').factory('giphyApiService', ['$http', '$q', '$ionicLoading', giphyApiService]);

  function giphyApiService($http, $q, $ionicLoading) {

    //Move this to a config file and get values from another service
    self.baseURI = 'http://api.giphy.com/';
    self.apiURIPath = 'v1/gifs/';
    self.apiKeyParam = '?api_key=dc6zaTOxFJmzC';

    //Private helper method to build request URI
    function buildApiRequest(requestParameterType, additionalParams) {
      var fullURI = self.baseURI + self.apiURIPath + requestParameterType + self.apiKeyParam + additionalParams;
    }

    //Get Trending Gifs
    function getTrendingGifs() {
      var requestURI = buildApiRequest('trending');
      var deferred = $q.defer();

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

    return {
      getTrendingGifs: getTrendingGifs
    };

  }

})();
