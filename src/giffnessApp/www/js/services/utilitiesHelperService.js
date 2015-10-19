(function() {
  'use strict';

  angular.module('giffnessApp').factory('utilitiesHelperService', ['$cordovaSocialSharing', '$ionicLoading', utilitiesHelperService]);

  function utilitiesHelperService($cordovaSocialSharing, $ionicLoading) {

    function shareGif(gifModel) {
      
      $ionicLoading.show({
        template: 'Sharing...'
      });

      var gifUrl = gifModel.imageUrl;
      if(gifUrl === undefined)
      {
        gifUrl = gifModel.fixedWidthStillUrl;
      }

      ionic.Platform.ready(function() {
        $cordovaSocialSharing
            .share(null, "Hi! I just wanted to share this awesome gif with you.", gifUrl, null)
            .then(function(result) {
              $ionicLoading.hide();
            }, function(err) {
              $ionicLoading.hide();
              alert('Sorry, it seems this gif could not be shared!');
            });
      });
      
    }

    return {
      shareGif: shareGif
    };

  };

})();
