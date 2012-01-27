define([
  'jquery',
  './../lib/svg',
  './scatter_graph_circle',
  './../lib/jquery.zoomable',
  './../models/film',
  './../models/axis',
  './scatter_graph_path',
  './axis_label_view'
], function ($, SVG, ScatterGraphCircle, _, Film, axis, ScatterGraphPath, AxisLabelView) {

  var  elem, circleGroup, pathGroup

  var init = function (mx, my) {
    elem = $(document.querySelector('svg'))
    paper = new SVG.Doc(document.querySelector('svg'))
    circleGroup = new SVG.Group
    pathGroup = new SVG.Group

    axis.x.name('profitability')
    axis.y.name('audience_score')

    circleGroup.attr('width', paper.width())
    circleGroup.attr('height', paper.height())
    pathGroup.attr('width', paper.width())
    pathGroup.attr('height', paper.height())

    circleGroup.add(pathGroup)

    elem.zoomable(circleGroup)

    axis.on('changed', drawAxisLabels)

    Film
      .on('loaded', draw)
      .on('similaritySearch', removePaths)
      .on('selected', removePaths)
  }

  var draw = function (films) {
    films.forEach(function (film) {
      var circle = new ScatterGraphCircle (film, axis).toElem()
      circleGroup.add(circle)

      film.on('similarTo', function (otherFilm) {
        var path = new ScatterGraphPath (film, otherFilm, axis).toElem()
        pathGroup.add(path)
      })
    })

    drawAxisLabels()

    paper.draw(circleGroup)
  }

  var removePaths = function () {
    pathGroup.empty()
  }

  var drawAxisLabels = function () {
    console.log(AxisLabelView)
    new AxisLabelView ('x', axis).render()
    new AxisLabelView ('y', axis).render()
  }

  return {
    init: init,
    draw: draw
  }
})