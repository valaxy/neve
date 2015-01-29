define(function (require, exports) {
	exports.init = function () {
		require('src/utility/utility')
		require('test/file-tree/file-tree-model')
		require('test/file-tree/file-model')

		require('test/file-tree/file-tree-view') // test error can't locate
		require('test/project-manager/project-manager')
		require('test/create-project-dialog/view-test')
	}
})