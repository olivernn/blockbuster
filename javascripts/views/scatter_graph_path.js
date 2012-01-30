define(['lib/svg'], function (SVG) {

  var ScatterGraphPath = function (startFilm, endFilm, axis) {
    this.startFilm = startFilm
    this.endFilm = endFilm
    this.axis = axis

    this.axis.on('changed', this.axisChanged.bind(this))
  }

  ScatterGraphPath.prototype.toElem = function () {
    this.line = new SVG.Line ({stroke: '#666', 'stroke-width': 1})
    this.line.startPoint(this.axis.filmToPoint(this.startFilm))
    this.line.endPoint(this.axis.filmToPoint(this.endFilm))
    return this.line
  }

  ScatterGraphPath.prototype.axisChanged = function () {
    this.line.animate('x1', {to: this.axis.filmToPoint(this.startFilm).x, dur: '1s', fill: 'freeze'})
    this.line.animate('y1', {to: this.axis.filmToPoint(this.startFilm).y, dur: '1s', fill: 'freeze'})

    this.line.animate('x2', {to: this.axis.filmToPoint(this.endFilm).x, dur: '1s', fill: 'freeze'})
    this.line.animate('y2', {to: this.axis.filmToPoint(this.endFilm).y, dur: '1s', fill: 'freeze'})
  }

  return ScatterGraphPath
})