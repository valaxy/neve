define(function (require, exports) {
	var temp = requireNode('temp')
	var fs = requireNode('fs')
	var path = requireNode('path')

	// - 1.txt: 111
	// - 2.md: 222
	// - a
	//      - 3.md: 333
	exports.createProjectFiles = function () {
		var rootdir = temp.mkdirSync('temp') // temp file dir
		fs.writeFileSync(path.join(rootdir, '1.txt'), '111')
		fs.writeFileSync(path.join(rootdir, '2.md'), '222')
		fs.mkdirSync(path.join(rootdir, 'a'))
		fs.writeFileSync(path.join(rootdir, 'a', '3.md'), '333')
		return rootdir
	}

})