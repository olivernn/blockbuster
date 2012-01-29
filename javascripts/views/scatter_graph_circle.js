define(['jquery', './../lib/svg', './../lib/tooltip'], function ($, SVG, tooltip) {

  var storyColor = {
    'discovery': 'rgb(122,73,28)',
    'escape': 'rgb(125, 0, 83)',
    'journey and return': 'rgb(199,200,202)',
    'comedy': 'rgb(34,164,151)',
    'quest': 'rgb(144,200,133)',
    'sacrifice': 'rgb(98,29,129)',
    'wretched excess': 'rgb(89,90,93)',
    'fish out of water': 'rgb(213,202,164)',
    'maturation': 'rgb(204,56,33)',
    'pursuit': 'rgb(161,71,141)',
    'rivalry': 'rgb(66,171,72)',
    'underdog': 'rgb(144,25,26)',
    'love': 'rgb(144,200,133)',
    'monster force': 'rgb(231,4,28)',
    'revenge': 'rgb(112,183,50)',
    'transformation': 'rgb(169,147,38)',
    'metamorphosis': 'rgb(69,70,72)',
    'rescue': 'rgb(231,50,128)',
    'tragedy': 'rgb(177,114,33)',
    'rags to riches': 'rgb(49,60,146)',
    'the riddle': 'rgb(152,203,194)',
    'temptation': 'rgb(211,147,126)'
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
      'fill': storyColor[this.film.normalizedStory()],
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
