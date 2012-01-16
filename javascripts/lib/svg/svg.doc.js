define(function () {
  var Doc = function (elem, attributes) {
    this.elem = elem
    this.attributes = attributes
  }

  Doc.prototype = {
    draw: function (obj) {
      this.elem.appendChild(obj.toElem())
    }
  }

  return Doc
})