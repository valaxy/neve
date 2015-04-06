define(function (require) {
	var _ = require('underscore')

	var JstreeAdapter = function ($root) {
		this._$root = $root
		//this._jstree = $root.jstree()
	}

	JstreeAdapter.prototype = {
		init: function () {

		},

		initContextMenu: function (fn) {
			this._$root.jstree({
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
							isDir: node.type == 'directory',
							data: node.data
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

			// 不知道为什么不能把这里的事件绑定放到events选项里
			var me = this
			this._$root.on('select_node.jstree', function (event, data) {
				var domId = data.selected[0]
				var file = me.getFile(domId).data
				me._$root.trigger('selectFile', [file])
			})

			// 这里的顺序很重要, 目前只测试出能放在最后执行, 原因不明
			this._jstree = this._$root.jstree()  // jstree control handler
		},

		addFile: function (file, parentId, callback) {
			var domId = this._jstree.create_node(parentId, {
				data: file.data,
				text: file.label,
				type: file.isDir ? 'directory' : 'file',
				state: {
					opened: true
				}
			}, 'last', function () {
			})
			return domId
		},

		updateFile: function (id, file) {

		},

		deleteFile: function (id) {
			this._jstree.delete_node(id)
		},

		getFile: function (id) {
			var node = this._jstree.get_node(id)
			return {
				id: node.id,
				label: node.text,
				icon: node.icon,
				isDir: node.type == 'directory',
				data: node.data
			}
		},

		selectFile: function (id) {
			this._jstree.select_node(id)
		}
	}

	return JstreeAdapter
})