define(['jquery', './../lib/svg', './../lib/tooltip'], function ($, SVG, tooltip) {

  var storyColor = {
    'Discovery': 'rgb(122,73,28)',
    'Escape': 'rgb(125, 0, 83)',
    'Journey & Return': 'rgb(199,200,202)',
    'Comedy': 'rgb(34,164,151)',
    'Quest': 'rgb(144,200,133)',
    'Sacrifice': 'rgb(98,29,129)',
    'Wretched Excess': 'rgb(89,90,93)',
    'Fish Out Of Water': 'rgb(213,202,164)',
    'Maturation': 'rgb(204,56,33)',
    'Pursuit': 'rgb(161,71,141)',
    'Rivalry': 'rgb(66,171,72)',
    'Underdog': 'rgb(144,25,26)',
    'Love': 'rgb(144,200,133)',
    'Monster Force': 'rgb(231,4,28)',
    'Revenge': 'rgb(112,183,50)',
    'Transformation': 'rgb(169,147,38)',
    'Metamorphosis': 'rgb(69,70,72)',
    'Rescue': 'rgb(231,50,128)',
    'Tragedy': 'rgb(177,114,33)',
    'Rags To Riches': 'rgb(49,60,146)',
    'The Riddle': 'rgb(152,203,194)',
    'Temptation': 'rgb(211,147,126)'
  }

  var ScatterGraphCircle = function (film, axis) {
    this.film = film
    this.axis = axis

    this.film
      .on('selected', this.expand.bind(this))
      .on('deselected', this.contract.bind(this))
      .on('search:included', this.expand.bind(this))
      .on('search:excluded', this.contract.bind(this))
      .on('highlight', this.highlight.bind(this))
      .on('unhighlight', this.unhighlght.bind(this))

    this.axis
      .on('changed', this.axisChanged.bind(this))
  }

  ScatterGraphCircle.prototype.axisChanged = function () {
    var point = this.axis.filmToPoint(this.film)

    this.circle.animate('cx', {to: point.x, dur: '1s', fill: 'freeze'})
    this.circle.animate('cy', {to: point.y, dur: '1s', fill: 'freeze'})
  }

  ScatterGraphCircle.prototype.toElem = function () {
    var point = this.axis.filmToPoint(this.film)

    this.circle = new SVG.Circle ({
      'cx': point.x,
      'cy': point.y,
      'r': 2,
      'fill': storyColor[this.film.attr('story')],
      'fill-opacity': 0.75,
      'stroke': 'none',
      'class': 'film'
    })

    this.circle
      .on('click', function () { this.film.select() }, this)
      .on('mouseout', tooltip.hide)
      .on('mouseout', this.unhighlght.bind(this))
      .on('mouseover', this.highlight.bind(this))
      .on('mouseover', function (e) {
        tooltip.show(this.film.attr('title'), {x: e.clientX, y: e.clientY})
      }, this)

    return this.circle
  }

  ScatterGraphCircle.prototype.highlight = function () {
    this.film.isSelected() ? this.blip() : this.expand()
  }

  ScatterGraphCircle.prototype.unhighlght = function () {
    this.film.isSelected() ? this.unBlip() : this.contract()
  }

  ScatterGraphCircle.prototype.blip = function () {
    this.circle.animate('r', {from: 10, to: 14, dur: '0.6s', fill: 'freeze'})
  }

  ScatterGraphCircle.prototype.unBlip = function () {
    this.circle.animate('r', {from: 14, to: 10, dur: '0.6s', fill: 'freeze'})
  }

  ScatterGraphCircle.prototype.expand = function () {
    this.circle.animate('r', {to: 10, dur: '1s', fill: 'freeze'})
  }

  ScatterGraphCircle.prototype.contract = function () {
    if (this.film.isSelected()) return
    this.circle.animate('r', {to: 2, dur: '1s', fill: 'freeze'})
  }

  return ScatterGraphCircle
})
