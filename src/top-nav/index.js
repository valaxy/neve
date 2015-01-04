define(function () {
	var TopNavView = Backbone.View.extend({
		el: $('.top-nav'),
		events: {
			'click .close': function () {
				alert('close me')
			}
		},
		initialize: function () {

		}
	})

	return TopNavView
})