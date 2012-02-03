define(['jquery', 'lib/events', 'vendor/lunr', 'lib/core_extensions/date'], function ($, eventModule, Lunr) {

  var id = 0

  var idx = Lunr("films", function () {
    this.ref('id')
    this.field('title', { multiplier: 10 })
    this.field('director', { multiplier: 5 })
    this.field('writer', { multiplier: 5 })
    this.field('all_actors', { multiplier: 5 })
    this.field('genre')
    this.field('story')
  })

  var Film = function (attributes) {
    this.attributes = attributes
    this.attributes.id = id++
    this.attributes.release_date = new Date (attributes.release_date)
    this.attributes.all_actors = this.attributes.actors.join(' ')
    this.attributes.profitability = this.attributes.worldwide_gross / this.attributes.budget * 100
    this.callbacks = {}
    Film.push(this)
    idx.add(this.attributes)
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

  Film.pluck = function (attrName) {
    return this.map(function (f) {
      return f.attr(attrName)
    })
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
    Film.forEachCall('excludeFromFilter')

    var results = idx.search(term).map(function (id) {
      var film = Film.find(id)
      film.includeInFilter()
      return film
    })

    this.emit('searchResults', results)
    return results
  }

  Film.findSimilarTo = function (film, attrs) {
    var attrs = attrs || []

    this.emit('similaritySearch')
    if (!attrs.length) return

    var attrWithinPercent = function (attrName, percent) {
      return function (f) {
        return (f.attr(attrName) > film.attr(attrName) * (1 - percent) && f.attr(attrName) < film.attr(attrName) * (1 + percent))
      }
    }

    var attrEqual = function (attrName) {
      return function (f) {
        return f.attr(attrName) === film.attr(attrName)
      }
    }

    var criteria = {
      budget: attrWithinPercent('budget', 0.1),
      runtime: attrWithinPercent('runtime', 0.05),
      profitability: attrWithinPercent('profitability', 0.1),
      foreignGross: attrWithinPercent('foreign_gross', 0.1),
      domesticGross: attrWithinPercent('domestic_gross', 0.1),
      openingTheatres: attrWithinPercent('number_of_theatres_in_opening_weekend', 0.01),
      leadStudio: attrEqual('lead_studio'),
      averagePerCinema: attrWithinPercent('box_office_average_per_cinema', 0.1),
      rated: attrEqual('rated'),
      releaseWeek: function (f) {
        return f.attr('release_date').weekNumber() === film.attr('release_date').weekNumber()
      }
    }

    return attrs
      .reduce(function (scope, attr) {
        return scope.filter(criteria[attr])
      }, Film.all())
      .map(function (f) {
        f.emit('similarTo', film)
        return f
      })
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

    normalizedStory: function () {
      if (!this.attr('story')) return

      return this.attr('story').toLowerCase().replace('&', 'and')
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
    },

    excludeFromFilter: function () {
      this._selected = false
      this.emit('search:excluded')
    },

    includeInFilter: function () {
      this._selected = true
      this.emit('search:included')
    }
  }

  return Film
})