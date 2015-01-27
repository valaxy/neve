define(function (require, exports) {
	exports.init = function () {
		require('src/utility/utility')

		//require('src/file-tree/file-tree-view') // test error can't locate
		require('file-tree/file-model')

		require('src/project-manager/project-manager-test')
	}
})