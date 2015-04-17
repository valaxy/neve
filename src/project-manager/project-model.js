var $__project_45_model_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "project-model.es6.js";
  define(function(require) {
    require('backbone');
    var FileModel = require('./file-model');
    var FileTreeModel = require('./file-tree-model');
    var path = require('path');
    var fs = requireNode('fs');
    var ProjectModel = Backbone.RelationalModel.extend({
      defaults: {
        name: '',
        location: '',
        lastOpenedDate: null
      },
      relations: [{
        type: Backbone.HasOne,
        key: 'openFile',
        relatedModel: FileModel,
        reverseRelation: {type: Backbone.HasOne}
      }, {
        type: Backbone.HasOne,
        key: 'fileTree',
        relatedModel: FileTreeModel,
        reverseRelation: {type: Backbone.HasOne}
      }],
      initialize: function() {
        this._manager = null;
        var me = this;
        this.on('change:openFile', function(project, file) {
          if (file) {
            me._manager.trigger('closeFile', project, file);
          }
          me._manager.trigger('openFile', [project, file]);
        });
      },
      saveOpen: function(content) {
        var absolutePath = path.join(this.get('location'), this.get('openFile').get('path'));
        fs.writeFile(absolutePath, content, function(err) {
          if (err) {
            alert(err);
          }
        });
      },
      filter: function(file) {}
    });
    return ProjectModel;
  });
  return {};
})();
//# sourceMappingURL=project-model.js.map
