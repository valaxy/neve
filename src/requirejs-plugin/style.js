define(function () {

	return {
		load: function (name, req, onload) {
			// 这里的text!为什么不能用全写??
			//req(['text!' + name + '.css'], function (styleValue) {
			//	onload(styleValue)
			//})


			// 上面那种方式会有路径错误
			onload('@import "' + req.toUrl(name + '.css') + '";')

		}
		// normalize怎么会调用两遍, 有问题啊? todo
		//, normalize: function (name) {
		//	return name + '.css'
		//}
	}
})