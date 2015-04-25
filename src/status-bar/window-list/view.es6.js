define(function (require) {
	var Backbone = require('backbone')

	var WindowListView = Backbone.View.extend({
		events: {
			'click .views': function (e) {
				var list = _.map(layout.getWindows(), function (win) {
					return {
						name: win.model.get('name'),
						icon: win.model.get('icon')
					}
				})
				var $menu = $(mustache.render(menuHTML, {
					list: list
				}))

				this.$('.menu').remove()
				this.$el.append($menu.show())

				e.preventDefault()
				return false
			}
		}
	})

	return WindowListView
})