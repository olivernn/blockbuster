define(['./svg.shape'], function (Shape) {
  Circle = function (attributes) {
    this.attributes = attributes
    this.callbacks = {}
  }

  Circle.prototype = new Shape

  Circle.prototype.elemName = 'circle'

  return Circle
})