define(function (require) {
	var Backbone = require('backbone')
	var mustache = require('mustache')
	var itemTemplate = require('html!./tab-template')
	var $ = require('jquery')

	// Tab
	var TabView = Backbone.View.extend({
		initialize: function () {
			this.render()
		},

		render: function () {
			return this.setElement($(mustache.render(itemTemplate, {
				text: this.model.get('file').get('name')
			})))
		}
	})

	return TabView
})