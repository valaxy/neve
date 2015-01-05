/**
 * a simple wrap about fs module
 */
define(function (require, exports) {

	var fs = requireNode('fs')
	var trash = requireNode('../../node_modules/trash/index')

	exports.create = function (absolutePath, isDirectory, callback) {
		if (isDirectory) {
			fs.mkdir(absolutePath, callback)
		} else {
			fs.writeFile(absolutePath, '', callback)
		}
	}

	exports.delete = function (absolutePath, isDirectory, callback) {
		//if (isDirectory) {
		//	fs.rmdir(absolutePath, callback)
		//} else {
		//	fs.unlink(absolutePath, callback)
		//}

		trash([absolutePath], callback)
	}

})