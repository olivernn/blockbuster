define(function () {

  var callbacks = {}

  var on = function (eventName, handler) {
    if (!(eventName in callbacks)) callbacks[eventName] = []
    callbacks[eventName].push(handler)
  }

  var emit = function (eventName) {
    var args = Array.prototype.slice.call(arguments, 1)
    callbacks[eventName] && callbacks[eventName].forEach(function (handler) {
      handler.apply(null, args)
    })
  }

  return {
    on: on,
    emit: emit
  }
})