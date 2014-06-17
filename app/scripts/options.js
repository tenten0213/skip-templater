'use strict';

angular.module('skip-templater.options', ['ui.bootstrap'])
.controller('OptionCtrl', ['$scope', 'TemplateService', function($scope, TemplateService) {
    $scope.alerts = [];
    var storage = chrome.storage.local;
    var promise = TemplateService.all();
    $scope.templates = [];

    promise.then(function(templates){
      $scope.templates = templates;
    });

    $scope.addTemplate = function() {
      if($scope.title === undefined || $scope.title === "") {
        $scope.alerts.push({ type: 'warning', msg: 'タイトルは必須です' })
      } else {
        saveLocalStorage();
        storage.get(function(items) {
           console.log(items);
        });
      }
    };


  function saveLocalStorage() {
      var template = { title: $scope.title, body: escape($scope.body) };
      var data = {};
      data[$scope.title] = template;
      storage.set(data);
      $scope.alerts.push({ type: 'success', msg: '登録しました' });
  }

  $scope.clear = function() {
    $scope.title = "";
    $scope.body= "";
  };

  $scope.allDelete = function() {
    if(window.confirm("本当に削除してよろしいですか？") == true) {
      storage.clear();
      $scope.clear();
      $scope.alerts.push({ type: 'danger', msg: '全件削除しました' })
      storage.get(function(items) {
         console.log(items);
      });
    }
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
