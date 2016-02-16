var myApp = angular.module('myApp',[]);

myApp.controller('TimerController', ['$scope', function($scope) {
  $scope.startScreenBoolean = true;
  $scope.ytLink = "";

  $scope.startTimer = function() {
    $scope.startScreenBoolean = false;
  };

  $scope.stopTimer = function() {
    $scope.startScreenBoolean = true;
  };

  $scope.$watch('ytLink', function(newValue, oldValue) {
    // Changes iframe on the dom to showcase the video linked
  });
}]);
