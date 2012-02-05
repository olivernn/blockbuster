define(['lib/events', './film', './axis_attribute'], function (eventModule, Film, AxisAttribute) {

  var attributes = {},
      paperWidth = 850,
      paperHeight = 590,
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

  var makeAxis = function (axis) {
    attributes[axis] = {}

    return {
      name: axisName(axis)
    }
  }

  var filmToPoint = function (film) {
    var xAttr = AxisAttribute.find(this.x.name()),
        yAttr = AxisAttribute.find(this.y.name()),
        xUnit = paperWidth / xAttr.max(),
        yUnit = paperHeight / yAttr.max()

    return {
      x: xUnit * xAttr.valueForFilm(film),
      y: paperHeight - (yUnit * yAttr.valueForFilm(film))
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