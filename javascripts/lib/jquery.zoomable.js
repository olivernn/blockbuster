define(['jquery', './svg'], function ($, SVG) {

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
      if (arguments.length === 0) return this.nwCoords
      this.nwCoords.x = x
      this.nwCoords.y = y
    },

    se: function (x, y) {
      if (arguments.length === 0) return this.seCoords
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

  var selection = $('<div>').css({
    border: '2px dotted #333',
    position: 'absolute',
    zIndex: 10
  })

  var zoomedIn = false

  $.fn.zoomable = function (svgObj) {
    var elem = this

    elem.bind('mousedown', function (mouseDownEvent) {
      if (mouseDownEvent.target.nodeName == 'circle') return true

      if (zoomedIn) {
        svgObj.attr('transform', 'foo')
        zoomedIn = false
        return
      } else {
        $(document.body).append(selection)

        var boundingBox = new BoundingBox (svgObj)
        boundingBox.nw(mouseDownEvent.pageX, mouseDownEvent.pageY)

        selection.css({
          left: boundingBox.nw().x,
          top: boundingBox.nw().y,
          width: 0,
          height: 0
        })

        elem.bind('mousemove', function (e) {
          selection.css({
            height: e.pageX - boundingBox.nw().x - 10,
            width: e.pageX - boundingBox.nw().x - 10
          })
        })

        elem.one('mouseup', function (mouseUpEvent) {
          elem.unbind('mousemove')
          selection.remove()
          boundingBox.se(mouseUpEvent.pageX, mouseUpEvent.pageY)
          svgObj.attr('transform', boundingBox.toTransform())
          zoomedIn = true
        })
      }
    })
  }
})
