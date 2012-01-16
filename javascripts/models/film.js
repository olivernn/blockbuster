define(['jquery'], function ($) {

  var Film = function (attributes) {
    this.attributes = attributes
    this.callbacks = {}
    Film.push(this)
  }

  Film._collection = [];

  (['forEach', 'map', 'reduce', 'push', 'indexOf', 'filter']).forEach(function (methodName) {
    Film[methodName] = Array.prototype[methodName].bind(Film._collection)
  })

  Film.all = function () {
    return Array.prototype.slice.call(this._collection)
  }

  Film.first = function () {
    return this.all()[0]
  }

  Film.load = function (fn) {
    $.getJSON('/data/data.json', function (films) {
      films.forEach(function (film) { new Film (film) })
      fn()
    })
  }

  Film.search = function (term) {
    return this
      .filter(function (film) {
        var match = film.attr('title').match(term)
        if (match) {
          film.emit('filter:included')
          return true
        } else {
          film.emit('filter:excluded')
          return false
        };
      })
  }

  Film.prototype = {
    attr: function (name) {
      return this.attributes[name]
    },

    on: function (eventName, handler) {
      if (!(eventName in this.callbacks)) this.callbacks[eventName] = []
      this.callbacks[eventName].push(handler)
      return this
    },

    emit: function (eventName) {
      var args = Array.prototype.slice.call(arguments, 1)
      this.callbacks[eventName].forEach(function (handler) {
        handler.apply(null, args)
      })
      return this
    }
  }

  return Film
})