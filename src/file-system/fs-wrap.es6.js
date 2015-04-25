/**
 * a simple wrap about fs module
 */
define(function (require, exports) {
	var path = requireNode('path')
	var fs = requireNode('fs')
	var trash = requireNode('trash')


	/** Create file or directory
	 */
	exports.create = function (absolutePath, isDirectory, callback) {
		if (isDirectory) {
			fs.mkdir(absolutePath, callback)
		} else {
			fs.writeFile(absolutePath, '', callback)
		}
	}

	/** Delete file or directory
	 */
	exports.delete = function (absolutePath, callback) {
		trash([absolutePath], callback) // put into garbage
	}


	/** Rename file or directory
	 */
	exports.rename = function (absolutePath, newName, callback) {
		var newAbsPath = path.join(path.dirname(absolutePath), newName)
		fs.rename(absolutePath, newAbsPath, callback)
	}


	/** Read file
	 */
	exports.readFile = function (absolutePath, callback) {
		fs.readFile(absolutePath, callback)
	}

})