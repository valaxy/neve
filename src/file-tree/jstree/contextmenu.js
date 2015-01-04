// this module is about contextmenu config of jstree
define(function () {
	var path = requireNode('path')

	var contextmenu = function (fileTreeView) {

		return {
			items: function (node) {
				if (node.type == 'directory') {
					return {
						createDir: {
							label: 'create directory',
							action: function () {
								fileTreeView._addFile('new directory', true, true, true, true)
							}
						},

						createFile: {
							label: 'create file',
							action: function () {
								var domId = node.id
								var dirModel = fileTreeView._domIdToModel[domId]
								var relPath = path.join(dirModel.get('path'), 'new file.md')
								fileTreeView._addFile(relPath, false, true, true, true)
							}
						},

						delete: {
							label: 'delete directory'
						},
						rename: {
							label: 'rename'
						}
					}
				} else { // file
					return {
						delete: {
							label: 'delete file',
							action: function () {

							}
						},
						rename: {
							label: 'rename'
						}
					}
				}
			}
		}
	}

	return contextmenu
})