define(function () {
	var id = 0
	return function () {
		return new Date().getTime() + '-' + id++
	}
})