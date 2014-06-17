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
            templates.push(items[title])
            deferred.resolve(templates);
          });
        });
        return deferred.promise;
      }
    }
  });
