define(function (require) {
	var g = require('../home/global')
	var path = requireNode('path')

	var TopNavView = Backbone.View.extend({
		el: $('.top-nav'),
		events: {
			'click .close': function () {
				alert('close me')
			},
			'click .save': function () {
				g.fileTree.saveOpen(g.editor.getValue())
				alert('save ok')
			}
		},
		initialize: function () {

		}
	})

	return TopNavView
})