var $__project_45_manager_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "project-manager.es6.js";
  define(function(require) {
    var fs = requireNode('fs');
    var path = require('path');
    var EventEmitter = require('bower_components/eventEmitter/EventEmitter.min');
    var Set = require('bower_components/algorithm-data-structure/src/set/ordered-set');
    var async = require('async');
    var Backbone = require('backbone');
    var Project = require('./project-model');
    require('backbone-relational');
    var ProjectManager = Backbone.RelationalModel.extend({
      relations: [{
        key: 'active',
        type: Backbone.HasOne,
        relatedModel: Project,
        reverseRelation: {
          key: 'manager',
          type: Backbone.HasOne
        }
      }],
      initialize: function() {
        this._set = new Set(function(p1, p2) {
          if (p1.get('lastOpenedDate') && p2.get('lastOpenedDate')) {
            return p1.get('lastOpenedDate').getTime() - p2.get('lastOpenedDate').getTime();
          } else if (p1.get('lastOpenedDate')) {
            return -1;
          } else {
            return 1;
          }
        });
      }
    });
    ProjectManager.HistoryMaxCount = 20;
    ProjectManager.prototype.isExist = function(project) {
      return fs.existsSync(project.get('location'));
    };
    ProjectManager.prototype.create = function(project, callback) {
      async.series([function(done) {
        fs.mkdir(project.get('location'), function(err) {
          done(err);
        });
      }, function(done) {
        fs.mkdir(path.join(project.get('location'), '.neve'), function(err) {
          done(err);
        });
      }], function(err) {
        callback(err);
      });
    };
    ProjectManager.prototype.open = function(project) {
      project._manager = this;
      if (this.get('active')) {
        this.close();
      }
      if (this._set.count() >= ProjectManager.HistoryMaxCount) {
        this._set.removeAt(0);
      }
      this._set.remove(project);
      project.set('lastOpenedDate', new Date);
      this._set.add(project);
      this.set('active', project);
      this.trigger('open', project);
    };
    ProjectManager.prototype.close = function() {
      var orignal = this.get('active');
      this.set('active', null);
      this.trigger('close', orignal);
    };
    ProjectManager.prototype.active = function() {
      return this.get('active');
    };
    ProjectManager.prototype.openedHistory = function() {
      return this._set.toArray();
    };
    return ProjectManager;
  });
  return {};
})();
//# sourceMappingURL=project-manager.js.map
