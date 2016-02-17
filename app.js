var myApp = angular.module('myApp',[]);

myApp.controller('TimerController', ['$scope', function($scope) {
  $scope.startScreenBoolean = true;
  $scope.ytLink = "";
  $scope.ytEmbedLink = "";
  $scope.ytHeight = 390;
  $scope.ytWidth = 640;

  $scope.startTimer = function() {
    $scope.startScreenBoolean = false;
  };

  $scope.stopTimer = function() {
    $scope.startScreenBoolean = true;
  };

  $scope.$watch('ytLink', function(newValue, oldValue) {
    if (newValue == oldValue) {
      return;
    }

    $scope.ytEmbedLink = $scope.ytLink.substr("https://www.youtube.com/watch?v=".length);
  });
}]);

myApp.directive('youtube', function($window) {
  return {
    restrict: "E",

    scope: {
      height:   "@",
      width:    "@",
      videoid:  "@"
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player(element.children()[0], {height: scope.height,
          width: scope.width,
          videoId: scope.videoid
        });
      };

      scope.$watch('videoid', function(newValue, oldValue) {
        player.cueVideoById(scope.videoid);
      });
    },
  }
});
