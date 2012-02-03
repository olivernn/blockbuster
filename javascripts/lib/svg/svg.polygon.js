define(['./svg.shape'], function (Shape) {
  Polygon = function (attributes, points) {
    this.attributes = attributes || {}
    this.points = points || []
    this.callbacks = {}
  }

  Polygon.prototype = new Shape

  Polygon.prototype.elemName = 'polygon'

  Polygon.prototype.addPoint = function (point) {
    this.points.push(point)
  }
  
  Polygon.prototype.toElem = function () {
    this.attributes.points = this.points.map(function (point) {
      return [point.x, point.y].join(' ')
    }).join(',')
  
    return Shape.prototype.toElem.call(this)
  }

  return Polygon
})