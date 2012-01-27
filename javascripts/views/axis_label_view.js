define(['jquery', './../vendor/poirot'], function ($, poirot) {

  var AxisLabelView = function (orientation, axis) {
    console.log('#' + orientation + '-axis-label-container')
    this.container = $('#' + orientation + '-axis-label-container')
    this.orientation = orientation
    this.axis = axis[orientation]
  }

  AxisLabelView.prototype = {
    render: function () {
      this.html = poirot.axisLabel($.extend({}, this.axis, {name: this.axis.name()}))

      this.html
        .delegate('h3', 'click', this.showList.bind(this))
        .delegate('li', 'click', this.selectAxisLabel.bind(this))

      this.container.html(this.html)
      console.log(this.container)
    },

    showList: function () {
      this.html.find('ul').show()
    },

    hideList: function () {
      this.html.find('ul').hide()
    },

    selectAxisLabel: function (e) {
      e.preventDefault()
      console.log('foo')
      this.axis.name($(e.target).data('axis-label'))
    }
  }

  return AxisLabelView
})