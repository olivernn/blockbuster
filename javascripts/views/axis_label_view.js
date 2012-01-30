define(['jquery', 'vendor/poirot'], function ($, poirot) {

  var AxisLabelView = function (orientation, axis) {
    this.container = $('#' + orientation + '-axis-label-container')
    this.orientation = orientation
    this.axis = axis[orientation]
    this.listDisplayed = false
  }

  AxisLabelView.prototype = {
    render: function () {
      this.html = poirot.axisLabel($.extend({}, this.axis, {
        name: this.axis.name(),
        orientation: this.orientation
      }))

      this.html
        .delegate('h3', 'click', this.toggleList.bind(this))
        .delegate('li', 'click', this.selectAxisLabel.bind(this))

      this.container.html(this.html)
    },

    toggleList: function () {
      this.listDisplayed ? this.hideList() : this.showList()
    },

    showList: function () {
      this.listDisplayed = true
      this.html.find('ul').show()
    },

    hideList: function () {
      this.listDisplayed = false
      this.html.find('ul').hide()
    },

    selectAxisLabel: function (e) {
      e.preventDefault()
      this.axis.name($(e.target).data('axis-label'))
    }
  }

  return AxisLabelView
})