define(function () {

	return {
		load: function (name, req, onload) {
			req(['text!' + name + '.html'], function (html) {
				onload(html)
			})
		}
	}
})