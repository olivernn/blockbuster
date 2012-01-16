define(['./svg.shape'], function (Shape) {
  Line = function (attributes, points) {
    this.attributes = attributes || {}
    this.points = points || []
    this.callbacks = {}
  }

  Line.prototype = new Shape

  Line.prototype.elemName = 'polyline'

  Line.prototype.addPoint = function (point) {
    this.points.push(point)
  }

  Line.prototype.toElem = function () {
    this.attributes.points = this.points.map(function (point) {
      return [point.x, point.y].join(' ')
    }).join(',')

    return Shape.prototype.toElem.call(this)
  }

  return Line
})