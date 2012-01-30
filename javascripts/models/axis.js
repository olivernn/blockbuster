define(['lib/events', './film'], function (eventModule, Film) {

  var possibleValues = {
    x: [
      'profitability',
      'budget',
      'worldwide_gross',
      'domestic_gross',
      'foreign_gross',
      'box_office_average_per_cinema'
    ],

    y: [
      'number_of_theatres_in_opening_weekend',
      'audience_score',
      'rotten_tomatoes',
      'runtime',
      'release_year_day'
    ]
  }

  var attributes = {},
      paperWidth = 850,
      paperHeight = 560,
      axis

  var axisName = function (a) {
    return function (val) {
      if (val) { 
        attributes[a].name = val
        axis.emit('changed')
      }
      return attributes[a].name
    }
  }

  var axisMax = function (axis) {
    return function () {
      return Math.max.apply(null, Film.pluck(attributes[axis].name))
    }
  }

  var axisMin = function (axis) {
    return function () {
      return Math.min.apply(null, Film.pluck(attributes[axis].name))
    }
  }

  var makeAxis = function (axis) {
    attributes[axis] = {}

    return {
      name: axisName(axis),
      max: axisMax(axis),
      min: axisMin(axis),
      possibleValues: possibleValues[axis]
    }
  }

  var filmToPoint = function (film) {
    var xUnit = paperWidth / Math.log(this.x.max()),
        yUnit = paperHeight / this.y.max()

    return {
      x: xUnit * Math.log(film.attr(this.x.name())),
      y: paperHeight - (yUnit * film.attr(this.y.name()))
    }
  }

  axis = {
    x: makeAxis('x'),
    y: makeAxis('y'),
    filmToPoint: filmToPoint,
    callbacks: {},
    on: function () {
      return eventModule.on.apply(this, arguments)
    },
    emit: function () {
      return eventModule.emit.apply(this, arguments)
    }
  }

  return axis
})