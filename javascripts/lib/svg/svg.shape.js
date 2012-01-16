define(function () {

  var svgNamespace = "http://www.w3.org/2000/svg"

  Shape = function () {}

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
      if (val) this.elem.setAttribute(name, val)
      return this.elem.getAttribute(name)
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
    }
  }

  return Shape
})