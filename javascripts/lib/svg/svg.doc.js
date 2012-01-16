define(function () {

  var getDimension = function (dimension) {
    return function () {
      return this.elem[dimension].baseVal.value
    }
  }

  var Doc = function (elem, attributes) {
    this.elem = elem
    this.attributes = attributes
  }

  Doc.prototype = {
    draw: function (obj) {
      this.elem.appendChild(obj.toElem())
    },

    width: getDimension('width'),
    height: getDimension('height')
  }

  return Doc
})