// this module is about contextmenu config of jstree
define(function () {
	var path = requireNode('path')

	var contextmenu = function (fileTreeView) {

		return {
			items: function (node) {
				var domId = node.id
				var model = fileTreeView._domIdToModel[domId]

				if (node.type == 'directory') {
					return {
						createDir: {
							label: 'create directory',
							action: function () {
								var relPath = path.join(model.get('path'), 'new directory')
								fileTreeView._addFile(relPath, true, true, true, true)
							}
						},

						createFile: {
							label: 'create file',
							action: function () {
								var relPath = path.join(model.get('path'), 'new file.md')
								fileTreeView._addFile(relPath, false, true, true, true)
							}
						},

						delete: {
							label: 'delete directory',
							action: function () {
								fileTreeView._deleteFile(model, true, true, true, true)
							}
						},
						rename: {
							label: 'rename',
							action: function () {

							}
						}
					}
				} else { // file
					return {
						delete: {
							label: 'delete file',
							action: function () {
								fileTreeView._deleteFile(model, false, true, true, true)
							}
						},
						rename: {
							label: 'rename',
							action: function () {

							}
						}
					}
				}
			}
		}
	}

	return contextmenu
})