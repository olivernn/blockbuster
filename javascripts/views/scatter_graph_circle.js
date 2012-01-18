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

  var normalizeX = function (val) {
    var total = paper.width(),
        max = Math.log(11420),
        unit = total / max
    return (unit * Math.log(val))
  }

  var normalizeY = function (val) {
    var total = paper.height(),
        max = 100,
        unit = total / max
    return total - (unit * val)
  }

  var filmToCircle = function (film) {
    return new SVG.Circle ({
      'cx': normalizeX(film.attr('profitability')),
      'cy': normalizeY(film.attr('audience_score')),
      'r': 2,
      'fill': storyColor[film.attr('story')],
      'fill-opacity': 0.75,
      'stroke': 'none',
      'class': 'film'
    })
  }

  var ScatterGraphCircle = function (film) {
    this.film = film

    this.film
      .on('selected', this.expand.bind(this))
      .on('deselected', this.contract.bind(this))
      .on('filter:included', this.expand.bind(this))
      .on('filter:excluded', this.contract.bind(this))
  }

  ScatterGraphCircle.prototype.toElem = function () {
    return this.circle = filmToCircle(this.film)
      .on('click', function () { this.film.select() }, this)
      .on('mouseout', tooltip.hide)
      .on('mouseover', function (e) {
        tooltip.show(this.film.attr('title'), {x: e.clientX, y: e.clientY})
      }, this)
  }

  ScatterGraphCircle.prototype.expand = function () {
    this.circle.animate('r', {to: 10, dur: '1s', fill: 'freeze'})
  }

  ScatterGraphCircle.prototype.contract = function () {
    this.circle.animate('r', {to: 2, dur: '1s', fill: 'freeze'})
  }

  return ScatterGraphCircle
})
