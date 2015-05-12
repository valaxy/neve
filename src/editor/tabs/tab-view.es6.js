define(function (require) {
	var Backbone = require('backbone')
	var mustache = require('mustache')
	var itemTemplate = require('html!./tab-template')
	var $ = require('jquery')

	// Tab
	var TabView = Backbone.View.extend({
		events: {
			'click .close': function () {
				this.model.destroy()
			}
		},

		initialize: function () {
			this.render()

			this.listenTo(this.model, 'destroy', function () {
				this.$el.parent().remove()
				this.remove()
			})
		},

		render: function () {
			return this.setElement($(mustache.render(itemTemplate, {
				text: this.model.get('file').get('name')
			})))
		}
	})

	return TabView
})