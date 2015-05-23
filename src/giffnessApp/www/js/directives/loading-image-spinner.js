(function() {

  angular.module('giffnessApp').directive('loadingImageSpinner', [loadingImageSpinner]);
    function loadingImageSpinner() {
      return {
        restrict: 'A',
        scope: {
          ngSrc: '@'
        },
        link: function(scope, element, attrs) {
          element.on('load', function() {
            //hide spinner
            element.css('display', 'block');
            element.parent().find('p').css('display', 'none');

          });
          scope.$watch('ngSrc', function() {
            //show spinner
            element.css('display', 'none');
            element.parent().find('p').css('display', 'block');
          });
      }
    };
  };

})();
