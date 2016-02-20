var myApp = angular.module('myApp',[]);

myApp.constant('YT_event', {
  STOP:            0,
  PLAY:            1,
  PAUSE:           2,
  STATUS_CHANGE:   3
});

myApp.controller('TimerController', ['$scope', 'YT_event', function($scope, YT_event) {
  // Defines which view to show
  $scope.startScreenBoolean = true;
  // Youtube variables
  $scope.ytLink = "";
  $scope.ytEmbedLink = "";
  $scope.YT_event = YT_event;
  // Timer variables
  $scope.hours = 0;
  $scope.minutes = 0;
  $scope.seconds = 0;
  $scope.duration = 0;
  $scope.timer = "00:00:00";

  // Sets the Youtube video to an appropriate size
  // -----------------------------------------------------------------------------
  $scope.setYtSize = function() {
    if (window.innerWidth > 800) {
      $scope.ytWidth = 800*0.9;
    } else {
      $scope.ytWidth = window.innerWidth*0.9;
    }
    $scope.ytHeight = $scope.ytWidth/16*9;
  };

  window.onresize = function() {
    $scope.setYtSize();
  };

  window.onresize();

  $scope.$watch('ytLink', function(newValue, oldValue) {
    if (newValue == oldValue) {
      return;
    }

    $scope.ytEmbedLink = $scope.ytLink.substr("https://www.youtube.com/watch?v=".length);
  });

  $scope.sendControlEvent = function (ctrlEvent) {
    this.$broadcast(ctrlEvent);
  };

  $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
    if (data == "ENDED") {
      $scope.resetTimer();
    }
  });

  // Timer functions
  // -----------------------------------------------------------------------------

  $scope.startTimer = function() {
    if ($scope.startScreenBoolean === true) {
      $scope.sendControlEvent(YT_event.STOP);
      // Duration is in seconds
      $scope.setTicker();
      var timer = $scope.duration, hours, minutes, seconds;
      $scope.ticker = setInterval(function () {
        hours = parseInt(timer / 60 / 60, 10);
        minutes = parseInt(timer / 60 % 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours  < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $scope.timer = hours + ":" + minutes + ":" + seconds;
        $scope.$apply();

        if (--timer < 0) {
          clearInterval($scope.ticker);
          $scope.sendControlEvent(YT_event.PLAY);
        }
      }, 1000);

      $scope.startScreenBoolean = false;
    } else {
      $scope.stopTimer();
    }
  };

  $scope.stopTimer = function() {
    clearInterval($scope.ticker);
    $scope.startScreenBoolean = true;
  };

  $scope.resetTimer = function() {
    $scope.stopTimer();
    $scope.startTimer();
  };

  $scope.setTicker = function() {
    var duration = ($scope.minutes*60) + ($scope.hours*60*60) + $scope.seconds;
    $scope.duration = duration;
    var timer = duration, hours, minutes, seconds;
    hours = parseInt(timer / 60 / 60, 10);
    minutes = parseInt(timer / 60 % 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours  < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $scope.timer = hours + ":" + minutes + ":" + seconds;
  };

  $scope.$watch('hours + minutes', function(newValue, oldValue) {
    if (newValue == oldValue) {
      return;
    }

    $scope.setTicker();
  });

  // -----------------------------------------------------------------------------
}]);

myApp.directive('youtube', function($window, YT_event) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@"
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {

        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 0,
            html5: 1,
            theme: "light",
            modesbranding: 0,
            color: "white",
            iv_load_policy: 3,
            showinfo: 1,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid,
          events: {
            'onStateChange': function(event) {

              var message = {
                event: YT_event.STATUS_CHANGE,
                data: ""
              };

              switch(event.data) {
                case YT.PlayerState.PLAYING:
                  message.data = "PLAYING";
                  break;
                case YT.PlayerState.ENDED:
                  message.data = "ENDED";
                  break;
                case YT.PlayerState.UNSTARTED:
                  message.data = "NOT PLAYING";
                  break;
                case YT.PlayerState.PAUSED:
                  message.data = "PAUSED";
                  break;
              }

              scope.$apply(function() {
                scope.$emit(message.event, message.data);
              });
            }
          }
        });
      };

      scope.$watch('videoid', function(newValue, oldValue) {
        player.cueVideoById(scope.videoid);
      });

      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }
        player.setSize(scope.width, scope.height);
      });

      scope.$on(YT_event.PLAY, function () {
        player.playVideo();
      });

      scope.$on(YT_event.STOP, function () {
        player.seekTo(0);
        player.stopVideo();
      });
    }
  };
});
