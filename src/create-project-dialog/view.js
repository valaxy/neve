define(function (require, exports) {

	var CreateProjectDialog = Backbone.View.extend({
		events: {
			'textInput .name': function () {
				alert(1)
			}
		},

		open: function () {
			$.magnificPopup.open({
				items: {
					src: this.$el,
					type: 'inline'
				},
				modal: true
			})
		},

		close: function () {

		}
	})

	return CreateProjectDialog
})