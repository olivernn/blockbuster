define(['./svg.matrix'], function (Matrix) {

  var svgNamespace = "http://www.w3.org/2000/svg"

  var getDimension = function (dimension) {
    return function () {
      return this.elem[dimension].baseVal.value
    }
  }

  Shape = function () {
    this.transform = new Matrix
  }

  Shape.prototype = {
    toElem: function () {
      this.elem = document.createElementNS(svgNamespace, this.elemName)

      Object.keys(this.attributes).forEach(function (attrName) {
        this.elem.setAttribute(attrName, this.attributes[attrName])
      }, this)

      Object.keys(this.callbacks).forEach(function (eventName) {
        this.callbacks[eventName].forEach(function (handler) {
          this.elem.addEventListener(eventName, handler)
        }, this)
      }, this)

      return this.elem
    },

    on: function (eventName, handler) {
      if (!(eventName in this.callbacks)) this.callbacks[eventName] = []
      this.callbacks[eventName].push(handler)
      return this
    },

    attr: function (name, val) {
      if (this.elem) {
        if (val) this.elem.setAttribute(name, val)
        return this.elem.getAttribute(name)
      } else {
        if (val) this.attributes[name] = val
        return this.attributes[name]
      };
    },

    animate: function (attributeName, opts) {
      var animate = document.createElementNS(svgNamespace, 'animate')

      animate.setAttribute('attributeName', attributeName)
      animate.setAttribute('begin', 'indefinite')
      Object.keys(opts).forEach(function (attrName) {
        animate.setAttribute(attrName, opts[attrName])
      })

      this.elem.appendChild(animate)
      animate.beginElement()
      return this
    },

    width: getDimension('width'),
    height: getDimension('height'),

    applyTransform: function () {
      this.transform.apply(this)
    }
  }

  return Shape
})