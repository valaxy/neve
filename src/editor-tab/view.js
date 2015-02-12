define(function () {

	var EditorTabView = Backbone.View.extend({
		events: {
			'click .close': function () {
				var $li = $(this).parent()
				var $ul = $li.parent()
				var index = $ul[0].indexOf($li[0])
				this.model.get('tabs').at(index).closeFile()
			}
		},
		initialize: function (options) {
			this._projectManager = options.projectManager

			var me = this
			this._projectManager.on('openFile', function () {

			})

			this._projectManager.on('close', function () {
				me.model.closeAllFiles()
			})
		}
	})

	return EditorTabView
})