define(['jquery'], function ($) {

  var BoundingBox = function (svgObj) {
    this.svgObj = svgObj

    this.nwCoords = {
      x: null,
      y: null
    }

    this.seCoords = {
      x: null,
      y: null
    }
  }

  BoundingBox.prototype = {
    nw: function (x, y) {
      this.nwCoords.x = x
      this.nwCoords.y = y
    },

    se: function (x, y) {
      this.seCoords.x = x
      this.seCoords.y = y
    },

    width: function () {
      return this.seCoords.x - this.nwCoords.x
    },

    translateX: function () {
      return -1 * this.nwCoords.x
    },

    translateY: function () {
      return -1 * this.nwCoords.y
    },

    zoomRatio: function () {
      return this.svgObj.attr('width') / this.width()
    },

    toTransform: function () {
      return "scale(" + this.zoomRatio() + ") translate(" + this.translateX() + "," + this.translateY() + ")"
    }
  }

  $.fn.zoomable = function (svgObj) {
    var elem = this

    elem.bind('mousedown', function (mouseDownEvent) {
      var boundingBox = new BoundingBox (svgObj)
      boundingBox.nw(mouseDownEvent.pageX, mouseDownEvent.pageY)

      elem.one('mouseup', function (mouseUpEvent) {
        boundingBox.se(mouseUpEvent.pageX, mouseUpEvent.pageY)
        svgObj.attr('transform', boundingBox.toTransform())
      })
    })
  }
})
