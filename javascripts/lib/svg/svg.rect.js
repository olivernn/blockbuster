define(['./svg.shape'], function (Shape) {
  
  Rect = function (attributes) {
    this.attributes = attributes
    this.callbacks = {}
  }

  Rect.prototype = new Shape

  Rect.prototype.elemName = 'rect'

  return Rect
})