define(['./svg.shape'], function (Shape) {
  var Group = function () {
    this.children = []
    this.attributes = {}
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

  Group.prototype.add = function (elem) {
    this.children.push(elem)
  }

  return Group
})