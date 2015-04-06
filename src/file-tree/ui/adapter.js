define(function (require, exports) {

	/** Events:
	 **     - selectFile(file): select file or directory
	 **     - menu:createFile(file): create file or directory
	 **     - menu:deleteFile(file): delete file or directory
	 **     - menu:renameFile(file):
	 ** Methods(relative event will trigger):
	 **     - selectFile(file):
	 **     - addFile(file, parentFile):
	 **     - deleteFile(file */
	var FileTreeUIAdapter = function (jstree, $root) {

	}

	FileTreeUIAdapter.prototype = {
		init: function () {
			var me = this


			//this._jstree.on('select_node.jstree', function (event, data) {
			//	var domId = data.selected[0]
			//	var file = me._domIdToModel[domId]
			//	me.trigger('selectFile', file)
			//})
		},

		/** returns the context-menu config para according by file */
		contextmenu: function (file) {

		}
	}
})