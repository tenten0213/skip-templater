'use strict';
angular.module('skip-templater.options', ['ui.bootstrap'])

.controller('OptionCtrl', ['$scope', function($scope) {

  $scope.addTemplate = function() {
    if($scope.title === undefined || $scope.title === "") {
      console.log("アラートを出す");
    } else {
      chrome.storage.local.get(function(items) {
        var templates = items.templates || [];
        var body = $scope.body.replace(/\r\n/g, "\\n");
        body = body.replace(/(\r)/g, "\\n");
        templates.push({ title: $scope.title, body: body });
        chrome.storage.local.set({ templates:  templates}, function() {
          $scope.title = "";
          $scope.body= "";
        });
        console.log(templates);
      });
    }
  };

  $scope.clear = function() {
    $scope.title = "";
    $scope.body= "";
  };

}]);