define(function (require) {
	var Tab = require('tab')
	var $ = require('jquery')

	var EditorTabView = Backbone.View.extend({
		events    : {
			'click tab'   : function (e) {
				this._tab.active($(e.currentTarget))
			},
			'click .close': function () {
				var $li = $(this).parent()
				var $ul = $li.parent()
				var index = $ul[0].indexOf($li[0])
				this.model.get('tabs').at(index).closeFile()
			}
		},
		initialize: function (options) {
			//this._projectManager = options.projectManager
			var tab = this._tab = new Tab
			this.setElement(tab.$dom)

			tab.add('tab1')
			tab.add('tab2')

			//var me = this
			//this._projectManager.on('openFile', function () {
			//
			//})
			//
			//this._projectManager.on('close', function () {
			//	me.model.closeAllFiles()
			//})
		}
	})

	return EditorTabView
})