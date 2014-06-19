'use strict';

angular.module('skip-templater.options', ['ui.bootstrap'])
.controller('OptionCtrl', ['$scope', '$rootScope', 'TemplateService', 'AlertService', function($scope, $rootScope, TemplateService, AlertService) {
    $rootScope.alerts = [];
    var storage = chrome.storage.local;
    var promise = TemplateService.all();
    $scope.templates = [];

    promise.then(function(templates){
      $scope.templates = templates;
    });

    $scope.addTemplate = function() {
      if($scope.title === undefined || $scope.title === '') {
        AlertService.add('warning', 'タイトルは必須です');
      } else {
        console.log($scope.templates);
        var same = false;
        var i;
        $($scope.templates).each(function(index, template){
          if(template.title === $scope.title) {
            same = true;
            i = index;
          }
        });

        if(same) {
          if(window.confirm('同じタイトルのテンプレートが存在します。上書きしてもよろしいですか？') === true) {
            var template = { title: $scope.title, body: escape($scope.body) };
            TemplateService.save(template);
            $scope.templates.splice(i, 1);
            $scope.templates.push(template);
            $scope.clear();
            AlertService.add('success', '登録しました');
          } else {
            AlertService.add('warning', 'キャンセルしました');
          }
        } else {
          var template = { title: $scope.title, body: escape($scope.body) };
          TemplateService.save(template);
          $scope.templates.push(template);
          $scope.clear();
          AlertService.add('success', '登録しました');
        }
      }
    };

  $scope.clear = function() {
    $scope.title = '';
    $scope.body= '';
  };

  $scope.readTemplate = function(template) {
    $scope.title = template.title;
    $scope.body= unescape(template.body);
  };

  $scope.deleteTemplate = function(template, index) {
    if(window.confirm('本当に削除してよろしいですか？') === true) {
      storage.remove(template.title);
      $scope.templates.splice(index, 1);
      AlertService.add('danger', '削除しました');
    }
  };

  $scope.allDeleteTemplate = function() {
    if($scope.templates.length ===0 ) {
      AlertService.add('warning', 'テンプレートが存在しません');
    } else {
      if(window.confirm('本当に削除してよろしいですか？') === true) {
        storage.clear();
        $scope.clear();
        $scope.templates = [];
        AlertService.add('danger', '全件削除しました');
      }
    }
  };

  $scope.closeAlert = function(index) {
    AlertService.close(index);
  };

}]);
