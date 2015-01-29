define(function (require) {
	require('backbone')
	var StateMachine = require('state-machine')

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

		var me = this
		var fsm = this._fsm = StateMachine.create({
			initial: 'hide',
			events: [
				{name: 'open', from: 'hide', to: 'show'},
				{name: 'close', from: 'show', to: 'hide'}
			],
			callbacks: {
				// config state hide
				onenterhide: function () {
					$button.on('mouseenter', onMouseenterButton)
					me._state = 'hide'
				},
				onleavehide: function () {
					$button.off('mouseenter', onMouseenterButton)
				},
				// config state show
				onentershow: function () {
					$document.on('click', onClickDocument)
					me._state = 'show'
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
				},

				// common events
				onenterstate: function (event, from, to) {
					me.trigger('enter:' + to)
				},
				onleavestate: function (event, from, to) {
					me.trigger('leave:' + from)
				}
			}
		})
	}

	MenuPopup.prototype.state = function () {
		return this._state
	}

	MenuPopup.prototype.close = function () {
		this._fsm.close()
	}

	_.extend(MenuPopup.prototype, Backbone.Events)

	return MenuPopup
})