define(['./svg.shape'], function (Shape) {

  var getDimension = function (dimension) {
    return function () {
      return this.elem[dimension].baseVal.value
    }
  }

  var Doc = function (elem, attributes) {
    this.elem = elem
    this.attributes = attributes
  }

  Doc.prototype = new Shape

  Doc.prototype.draw = function (obj) {
    this.elem.appendChild(obj.toElem())
  }

  return Doc
})