define(function (require, exports) {

	exports.extendArray = function (ary) {
		for (var i = 1; i < arguments.length; i++) {
			var superAry = arguments[i]
			for (var j = 0; j < superAry.length; j++) {
				ary.push(superAry[j])
			}
		}
		return ary
	}

	//if (typeof QUnit != 'undefined') {
	//
	//	QUnit.module('utility')
	//
	//	QUnit.test('extendArray', function (assert) {
	//		var a = [1]
	//		var b = [2, 3]
	//		var c = [4, 5, 6]
	//		var d = exports.extendArray(a, b, c)
	//
	//		assert.equal(d.length, 6)
	//		for (var i = 0; i < 6; i++) {
	//			assert.equal(d[i], i + 1)
	//		}
	//	})
	//}
})