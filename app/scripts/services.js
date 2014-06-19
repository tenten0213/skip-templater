'use strict';

angular.module('skip-templater.services', [])
  .factory('TemplateService', function($q) {
    var storage = chrome.storage.local;
    var deferred = $q.defer();
    var templates = [];
    return {
      all: function() {
        storage.get(function(items) {
          $(Object.keys(items)).each(function(index, title){
            templates.push(items[title]);
            deferred.resolve(templates);
          });
        });
        return deferred.promise;
      },
      save: function(template) {
        var data = {};
        data[template.title] = template;
        storage.set(data);
      }
    };
  })
  .service('AlertService', function($rootScope, $timeout) {
    return {
      add: function(type, msg) {
        $rootScope.alerts.push({ type: type, msg: msg});
        $timeout(function(){
            $rootScope.alerts.splice(0, 1);
        }, 3000);
      },
      close: function(index) {
        $rootScope.alerts.splice(index, 1);
      }
    };
  });
