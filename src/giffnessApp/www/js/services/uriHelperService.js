(function() {
  'use strict';

  angular.module('giffnessApp').factory('uriHelperService', [uriHelperService]);

  function uriHelperService() {

    //Try get title piece from url
    function getTitleArrayFromUrl(url) {
      var splitUrl = url.split('/');
      var titleTextArray =
         _.remove(splitUrl, function(value) {
           return !_.isEmpty(value);
         });

      var titleTextUrlPiece = _.last(titleTextArray);
      return titleTextUrlPiece;
    }

    //Capitalize title
    function getCapitalizedTitleFromArray(titleTextUrlPiece) {
      var titleSplit = titleTextUrlPiece.split(/-|_/);
      var titleText =
        _.takeWhile(titleSplit, function(value) {
          //Assume any piece that contains a number is the hash of the url part.
          //TODO: Refactor to be hash based check?
          //Regex taken from: http://stackoverflow.com/questions/4440286/numbers-not-allowed-0-9-regex-expression-in-javascript
          return value.match(/^([^0-9]*)$/);
        })
        .map(function(word) {
          return _.capitalize(word);
        })
        .join(' ');

        return titleText;
    }


    return {
      getCapitalizedTitleFromArray: getCapitalizedTitleFromArray,
      getTitleArrayFromUrl: getTitleArrayFromUrl
    };

  };

})();
