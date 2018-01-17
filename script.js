(function() {
  'use strict';

  angular.module('app', []);

  angular.module('app').controller('Main', function($scope) {

    $scope.test = "Hello world";

    $scope.timerCallback = function() {
      $scope.$apply(function(){
        $scope.test = "Timeout!!!";
      });
    };

    

  });

  angular.module('app').directive('ngTimer', function() {
    return {
      restrict: 'A',
      template: "<span>{{hours}}:{{minutes}}:{{seconds}}</span>",
      scope: {
        callback: '=',
        timeSec: '='
      },
      replace: true,
      link: function(scope, element, attrs) {
        scope.hours = "00";
        scope.minutes = "00";
        scope.seconds = "00";
        var interval = null;

        var endTimer = function() {
          clearInterval(interval);
        }

        var correctInt = function(number) {
          if (number < 10) {
            return "0" + number;
          }
          return number;
        }

        var run = function() {
          interval = setInterval(function() {
            scope.$apply(function(){
              scope.timeSec -= 1;
              scope.hours = correctInt(parseInt(scope.timeSec / 3600));
              scope.minutes = correctInt(parseInt(scope.timeSec % 3600 / 60));
              scope.seconds = correctInt(scope.timeSec % 60);
            })
            
            if (scope.timeSec === 0) {
              clearInterval(interval);
              scope.callback();
            }
          }, 1000);
        }

        run();
      }
    };
  });

})();