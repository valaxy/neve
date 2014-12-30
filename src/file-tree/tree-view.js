define(function () {
	var watch = requireNode('../../node_modules/watch/main')

	var TreeView = Backbone.View.extend({

		events: {
			// when click file load the file content
			'click li': function () {

			}
		},

		_appendNode: function () {

		},

		initialize: function () {
			var me = this

			function processFiles(files) {
				var root = path.normalize(DIR)
				me._jstree.create_node(null, root)

				for (var key in files) {
					console.log(path.normalize(key))
				}
			}

			// init jstree
			this.$el.jstree({
				core: {
					check_callback: true
				}
			})
			this._jstree = this.$el.jstree()

			// iterate the file tree to add all the files and directories
			var DIR = 'f://test'
			watch.watchTree(DIR, function (files, curr, prev) {
				if (typeof files == 'object' && curr == null && prev == null) {
					watch.unwatchTree(DIR)
					processFiles(files)
				}
			})

		}
	})

	return TreeView
})