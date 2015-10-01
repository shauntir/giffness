(function() {
  'use strict';

  angular.module('giffnessApp').factory('utilitiesHelperService', ['$cordovaSocialSharing', utilitiesHelperService]);

  function utilitiesHelperService($cordovaSocialSharing) {

    function shareGif(gifModel) {
      ionic.Platform.ready(function() {
        $cordovaSocialSharing
            .share(null, "Hi! I just wanted to share this awesome gif with you.", gifModel.imageUrl, null)
            .then(function(result) {
              // Move along, nothing to see here.
            }, function(err) {
              // An error occured. Show a message to the user
            });
      });
    }

    return {
      shareGif: shareGif
    };

  };

})();
