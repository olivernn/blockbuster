define(function () {
  return  {
    on: function (eventName, handler, context) {
      if (!(eventName in this.callbacks)) this.callbacks[eventName] = []
      this.callbacks[eventName].push(handler.bind(context))
      return this
    },

    emit: function (eventName) {
      var args = Array.prototype.slice.call(arguments, 1)
      if (eventName in this.callbacks) {
        this.callbacks[eventName].forEach(function (handler) {
          handler.apply(null, args)
        })
      };
      return this
    }
  }
})