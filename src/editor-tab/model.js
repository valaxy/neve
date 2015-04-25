var $__model_46_es6_46_js__ = (function() {
  "use strict";
  var __moduleName = "model.es6.js";
  define(function(require) {
    var ItemModel = require('./item-model');
    var EditorTabModel = Backbone.Relational.extend({
      relations: [{
        type: Backbone.HasMany,
        key: 'tabs',
        relatedModel: ItemModel,
        reverseRelation: {type: Backbone.HasOne}
      }],
      closeAllFile: function() {}
    });
    return EditorTabModel;
  });
  return {};
})();
//# sourceMappingURL=model.js.map
