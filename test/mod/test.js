define(function (require, exports) {
	exports.init = function () {
		require('../../src/tree/node-model')
		require('../../src/tree/tree-model')

		require('../../src/file-tree/file-tree-view')
	}
})