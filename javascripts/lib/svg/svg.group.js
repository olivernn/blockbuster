define(['./svg.shape'], function (Shape) {
  var Group = function (attributes) {
    this.children = []
    this.attributes = attributes || {}
    this.callbacks = {}
  }

  Group.prototype = new Shape

  Group.prototype.elemName = 'g'

  Group.prototype.toElem = function () {
    return this.children.reduce(function (elem, child) {
      elem.appendChild(child.toElem())
      return elem
    }, Shape.prototype.toElem.call(this))
  }

  Group.prototype.add = function (child) {
    this.children.push(child)
    if (this.elem) {
      this.elem.appendChild(child.toElem())
    }
    return this
  }

  Group.prototype.empty = function () {
    this.children = []

    if (!this.elem) return this

    while (this.elem.lastChild) {
      this.elem.removeChild(this.elem.lastChild)
    }

    return this
  }

  return Group
})