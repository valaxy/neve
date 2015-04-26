define(function (require) {
	require('backbone')
	var FileModel = require('./file-model')
	var FileTreeModel = require('./file-tree-model')
	var path = require('path')
	var propagation = require('backbone-event-propagation')
	var fs = requireNode('fs')
	var Backbone = require('backbone')

	var ProjectModel = propagation.mixin(Backbone.RelationalModel.extend({
		defaults: {
			name: '',             // unique identity of project
			location: '',         // absolute path of local file system
			lastOpenedDate: null // opened time
		},

		relations: [{
			/** Opened File */
			type: Backbone.HasOne,
			key: 'openFile',
			relatedModel: FileModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}, {
			type: Backbone.HasOne,
			key: 'fileTree',
			relatedModel: FileTreeModel,
			reverseRelation: {
				type: Backbone.HasOne
			}
		}],

		propagation: 'manager',

		initialize: function () {
			this._manager = null

			var me = this
			this.on('change:openFile', function (project, file) {
				if (file) {
					me._manager.trigger('closeFile', project, file)
				}
				me._manager.trigger('openFile', project, file)
			})
		},


		//// save the opened file
		//saveOpen: function (content) {
		//	var absolutePath = path.join(this.get('location'), this.get('openFile').get('path'))
		//	fs.writeFile(absolutePath, content, function (err) {
		//		if (err) {
		//			alert(err)
		//		}
		//	})
		//},


		// if this is project file return true, otherwise return false
		filter: function (file) {

		}
	}))

	return ProjectModel
})