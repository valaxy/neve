define(function (require, exports) {
	var _ = require('underscore')

	var JstreeAdapter = function (jstree, $root) {
		this._jstree = jstree
		this._$root = $root
	}

	JstreeAdapter.prototype = {
		init: function () {

		},

		initContextMenu: function (fn) {
			this._jstree.jstree({
				core: {
					check_callback: true
				},
				types: {
					file: {
						icon: 'fa fa-file-o'
					},
					directory: {
						icon: 'fa fa-folder'
					}
				},
				contextmenu: {
					items: function (node) {
						var items = fn({
							id: node.id,
							isDir: node.type == 'directory'
						})

						var keys = _.map(items, function (item, index) {
							return index
						})

						var values = _.map(items, function (item) {
							return {
								label: item.label,
								action: item.action
							}
						})

						return _.object(keys, values)
					}
				},
				plugins: ['types', 'wholerow', 'contextmenu']
			})
		}
	}

	return JstreeAdapter
})