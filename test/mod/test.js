define(function (require, exports) {
	exports.init = function () {
		require('src/utility/utility')

		require('src/tree/node-model')
		require('src/tree/tree-model')

		//require('src/file-tree/file-tree-view') // test error can't locate
		require('../file-tree/file-model')

	}
})