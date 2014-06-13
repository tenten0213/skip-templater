'use strict';
angular.module('skip-templater.options', ['ui.bootstrap'])

.controller('OptionCtrl', ['$scope', function($scope) {
  $scope.alerts = [];
  $scope.addTemplate = function() {
    if($scope.title === undefined || $scope.title === "") {
      $scope.alerts.push({ type: 'warning', msg: 'タイトルは必須です' })
    } else {
      chrome.storage.local.get(function(items) {
        var templates = items.templates || [];
        var body = escape($scope.body);
        templates.push({ title: $scope.title, body: body });
        chrome.storage.local.set({ templates:  templates}, function() {
        });
        console.log(templates);
      });
      $scope.alerts.push({ type: 'success', msg: '登録しました' })
    }
  };

  $scope.clear = function() {
    $scope.title = "";
    $scope.body= "";
    chrome.storage.local.get(function(items) {
       var templates = items.templates || [];
       templates = templates.filter(function(index) {
          return index != 2;
       });
       console.log(templates);
    });
  };

  $scope.allDelete = function() {
    if(window.confirm("本当に削除してよろしいですか？") == true) {
      chrome.storage.local.clear();
    }
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);