define(function (require) {
	var StateMachine = require('bower_components/javascript-state-machine/state-machine.min')

	/**
	 *
	 * - $button
	 * - $menu
	 */
	var MenuPopup = function (options) {
		var $button = options.$button
		var $menu = options.$menu
		var $document = $(document)

		var onMouseenterButton = function () {
			fsm.open()
		}

		var onClickDocument = function () {
			fsm.close()
		}

		var fsm = StateMachine.create({
			initial: 'hide',
			events: [
				{name: 'open', from: 'hide', to: 'show'},
				{name: 'close', from: 'show', to: 'hide'}
			],
			callbacks: {
				// config state hide
				onenterhide: function () {
					$button.on('mouseenter', onMouseenterButton)
				},
				onleavehide: function () {
					$button.off('mouseenter', onMouseenterButton)
				},
				// config state show
				onentershow: function () {
					$document.on('click', onClickDocument)
				},
				onleaveshow: function () {
					$document.off('click', onClickDocument)
				},
				// event open
				onafteropen: function () {
					$menu.css({
						left: $button[0].offsetLeft,
						top: $button[0].offsetHeight
					}).show()
				},
				// event close
				onafterclose: function () {
					$menu.hide()
				}
			}
		})
	}

	return MenuPopup
})