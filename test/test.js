define(function (require, exports) {
	exports.init = function () {
		//require('src/utility/utility')
		//require('src/file-tree/file-tree-view') // test error can't locate
		//require('file-tree/file-model')

		require('./project-manager/project-manager-test')
		require('./create-project-dialog/view-test')
	}
})