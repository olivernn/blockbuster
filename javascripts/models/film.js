define(['jquery', './../lib/events'], function ($, eventModule) {

  var id = 0

  var Film = function (attributes) {
    this.attributes = attributes
    this.attributes.id = id++
    this.attributes.profitability = this.attributes.worldwide_gross / this.attributes.budget * 100
    this.callbacks = {}
    Film.push(this)
  }

  Film._collection = [];
  Film.callbacks = {};

  Film.on = eventModule.on.bind(Film);
  Film.emit = eventModule.emit.bind(Film);

  (['forEach', 'map', 'reduce', 'push', 'indexOf', 'filter']).forEach(function (methodName) {
    Film[methodName] = Array.prototype[methodName].bind(Film._collection)
  })

  Film.forEachCall = function (method) {
    var args = Array.prototype.slice.call(arguments, 1)
    Film.forEach(function (film) {
      film[method].apply(film, args)
    })
  }

  Film.find = function (id) {
    return this._collection[id]
  }

  Film.all = function () {
    return Array.prototype.slice.call(this._collection)
  }

  Film.first = function () {
    return this.all()[0]
  }

  Film.sortBy = function (attrName) {
    return this.all().sort(function (a, b) {
      if (a.attr(attrName) > b.attr(attrName)) return -1
      if (b.attr(attrName) > a.attr(attrName)) return 1
      return 0
    })
  }

  Film.load = function (fn) {
    $.getJSON('/data/data.json', function (films) {
      films.forEach(function (film) { 
        if (film.budget > 0 && film.worldwide_gross > 0) new Film (film)
      })
      fn()
    })
  }

  Film.search = function (term) {
    var results = this
      .filter(function (film) {
        var match = film.attr('title').match(term)
        if (match) {
          film.emit('search:included')
          return true
        } else {
          film.emit('search:excluded')
          return false
        };
      })

    this.emit('searchResults', results)
    return results
  }

  Film.prototype = {
    attr: function (name) {
      return this.attributes[name]
    },

    on: function () {
      return eventModule.on.apply(this, arguments)
    },

    emit: function (eventName) {
      Film.emit(eventName, this)
      return eventModule.emit.apply(this, arguments)
    },

    select: function () {
      Film.forEachCall('deselect')
      this._selected = true
      this.emit('selected')
    },

    deselect: function () {
      this._selected = false
      this.emit('deselected')
    },

    isSelected: function () {
      return !!this._selected
    },

    highlight: function () {
      this.emit('highlight')
    },

    unhighlight: function () {
      this.emit('unhighlight')
    }
  }

  return Film
})