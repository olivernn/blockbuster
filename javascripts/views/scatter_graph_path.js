define(['./../lib/svg'], function (SVG) {

  var normalizeX = function (val) {
    var total = 862,
        max = Math.log(11420),
        unit = total / max
    return (unit * Math.log(val))
  }

  var normalizeY = function (val) {
    var total = 602,
        max = 100,
        unit = total / max
    return total - (unit * val)
  }

  var filmToPoint = function (film) {
    return {
      x: normalizeX(film.attr('profitability')),
      y: normalizeY(film.attr('audience_score'))
    }
  }

  var ScatterGraphPath = function (startFilm, endFilm) {
    this.startFilm = startFilm
    this.endFilm = endFilm
  }

  ScatterGraphPath.prototype.toElem = function () {
    this.line = new SVG.Line ({stroke: '#666', 'stroke-width': 1})
    this.line.addPoint(filmToPoint(this.startFilm))
    this.line.addPoint(filmToPoint(this.endFilm))
    return this.line
  }

  return ScatterGraphPath
})