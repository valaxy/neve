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
		var getStat = function () {
			fs.stat(absolutePath, function (err, stat) {
				callback(err, stat)
			})
		}

		if (isDirectory) {
			fs.mkdir(absolutePath, function (err) {
				if (err) {
					callback(err)
				}
				getStat(callback)
			})
		} else {
			fs.writeFile(absolutePath, '', function (err) {
				if (err) {
					callback(err)
				}
				getStat(callback)
			})
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