'use strict'

angular.module('spinner')
.component('spinner', {
    templateUrl: './templates/spinner.html',
    controller: function($interval) {
        var self = this;

        self.activated = true;
        self.determinateValue = 30;

        $interval(function() {
          self.determinateValue += 1;
          if (self.determinateValue > 100) {
            self.determinateValue = 30;
          }
  
        }, 100);
      }
});


