define(['./svg.shape'], function (Shape) {
  Line = function (attributes, points) {
    this.attributes = attributes || {}
    this.points = points || []
    this.callbacks = {}
  }

  Line.prototype = new Shape

  Line.prototype.elemName = 'line'

  Line.prototype.startPoint = function (point) {
    this.attributes.x1 = point.x
    this.attributes.y1 = point.y
  }

  Line.prototype.endPoint = function (point) {
    this.attributes.x2 = point.x
    this.attributes.y2 = point.y
  }
  // 
  // Line.prototype.toElem = function () {
  //   this.attributes.points = this.points.map(function (point) {
  //     return [point.x, point.y].join(' ')
  //   }).join(',')
  // 
  //   return Shape.prototype.toElem.call(this)
  // }

  return Line
})