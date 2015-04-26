define(function () {
	var watch = requireNode('watch')

	var FileTreeWatch = function () {
		// nothing
	}

	FileTreeWatch.prototype.walkAllFiles = function (root, options, callback) {
		// iterate the file tree to add all the files and directories
		watch.watchTree(root, options, function (files, curr, prev) {
			if (typeof files == 'object' && curr == null && prev == null) {
				watch.unwatchTree(root)
				callback(files)
			}
		})
	}


	/** Events:
	 **     created
	 **     changed
	 **     removed??
	 **/
	FileTreeWatch.prototype.startWatch = function (rootDir) {

	}

	FileTreeWatch.prototype.stopWatch = function () {

	}

	return FileTreeWatch

})