(function() {
  'use strict';

  angular.module('giffnessApp').factory('giphyApiPrettifyService', [giphyApiPrettifyService]);

  function giphyApiPrettifyService() {

    function getTitleArrayFromUrl(url) {
      var splitUrl = url.split('/');
      var titleTextUrlPiece = _.last(splitUrl);

      return titleTextUrlPiece;
    }

    function getCapitalizedTitleFromArray(titleTextUrlPiece) {
      var titleSplit = titleTextUrlPiece.split('-');
      var titleText =
        _.without(titleSplit, _.last(titleSplit))
        .map(function(word) {
          return _.capitalize(word);
        })
        .join(' ');

        return titleText;
    }

    //Get Trending Gifs Transformed Pretty Json
    function getTrendingGifsPretty(giphyReponseData) {

      var prettyJsonReponse =
        _.chain(giphyReponseData.data)
         .map(function(item) {
           var titleFromUrl = getCapitalizedTitleFromArray(getTitleArrayFromUrl(item.url));
           return {
             giphyUrl: item.url,
             fixedWidthStillUrl: item.images.fixed_width_still.url,
             caption: item.caption,
             title: titleFromUrl,
             avatar: item.images.fixed_width_small_still.url
           };
         })
         .value();

      return prettyJsonReponse;
    }

    return {
      getTrendingGifsPretty: getTrendingGifsPretty
    };

  };

})();
