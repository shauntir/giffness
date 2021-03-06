(function() {
  'use strict';

  angular.module('giffnessApp').factory('giphyApiPrettifyService', ['uriHelperService', giphyApiPrettifyService]);

  function giphyApiPrettifyService(uriHelperService) {

    function getTitleForGif(data) {
      var title = uriHelperService.getCapitalizedTitleFromArray(
          uriHelperService.getTitleArrayFromUrl(data.url));

      if(title === "") {
        title = uriHelperService.getCapitalizedTitleFromArray(
          uriHelperService.getTitleArrayFromUrl(data.source));
      }

      if(title === "") {
        title = "Giffness Gif";
      }

      return title;
    }

    //Get Trending Gifs Transformed Pretty Object
    function getTrendingGifsPretty(giphyReponseData) {

      var prettyJsonReponse =
        _.chain(giphyReponseData.data)
         .map(function(item) {
           var titleFromUrl = getTitleForGif(item);
           return {
             giphyUrl: item.url,
             fixedWidthStillUrl: item.images.fixed_width_still.url,
             fixedWidthUrl: item.images.fixed_width.url,
             caption: item.caption,
             title: titleFromUrl,
             avatar: item.images.fixed_width_small_still.url
           };
         })
         .value();

      return prettyJsonReponse;
    }

    //Get Trending Gifs Transformed Pretty Object
    function getRandomGifPretty(giphyReponseData) {
      var prettyJsonReponse =
        _.chain([giphyReponseData.data])
         .map(function(item) {
           var titleFromUrl = getTitleForGif(item);
           return {
             giphyUrl: item.url,
             imageUrl: item.image_url,
             caption: item.caption,
             title: titleFromUrl
           };
         })
         .value()

      prettyJsonReponse = _.first(prettyJsonReponse);
      return prettyJsonReponse;
    }

    return {
      getTrendingGifsPretty: getTrendingGifsPretty,
      getRandomGifPretty: getRandomGifPretty
    };

  };

})();
