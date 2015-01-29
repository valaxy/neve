define(function () {

	var MenuAssociate = function (options) {
		var menuPopups = options.menuPopups

		for (var i in menuPopups) {
			var menuPopup = menuPopups[i]

			var handler = function () {
				var i = this.data
				for (var j in menuPopups) {
					if (i !== j && menuPopups[j].state() == 'show') {
						menuPopups[j].close()
					}
				}
			}
			handler.data = i

			menuPopup.on('enter:show', handler, handler)
		}
	}

	return MenuAssociate
})