define(['./../lib/events', './film'], function (eventModule, Film) {

  var attributes = {},
      paperWidth = 850,
      paperHeight = 560

  var axisName = function (axis) {
    return function (val) {
      if (val) attributes[axis].name = val
      return attributes[axis].name
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
      min: axisMin(axis)
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

  var axis = {
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