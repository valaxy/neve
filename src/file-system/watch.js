define(function (require, exports) {
	var watch = requireNode('../../node_modules/watch/main')

	var FileTreeWatch = function () {

	}

	FileTreeWatch.prototype.getAllFiles = function (root, options, callback) {
		// iterate the file tree to add all the files and directories
		watch.watchTree(root, options, function (files, curr, prev) {
			if (typeof files == 'object' && curr == null && prev == null) {
				watch.unwatchTree(root)
				callback(files)
			}
		})
	}

	FileTreeWatch.prototype.watch = function (onCreate, onChange, onRemove) {

	}

	return FileTreeWatch

})