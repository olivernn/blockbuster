define([
  'jquery',
  'lib/svg',
  './scatter_graph_circle',
  'models/film',
  'models/axis',
  './scatter_graph_path',
  './axis_label_view'
], function ($, SVG, ScatterGraphCircle, Film, axis, ScatterGraphPath, AxisLabelView) {

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

    new AxisLabelView ('x', axis).render()
    new AxisLabelView ('y', axis).render()

    var xAxis = new SVG.Line ({stroke: '#666', 'stroke-width': 2}),
        yAxis = new SVG.Line ({stroke: '#666', 'stroke-width': 2}),
        xTriangle = new SVG.Polygon ({stroke: '#666', 'stroke-width': 0, fill: '#666'}),
        yTriangle = new SVG.Polygon ({stroke: '#666', 'stroke-width': 0, fill: '#666', title: 'foo'})

    xAxis.startPoint({x: 10, y: paper.height() - 10})
    xAxis.endPoint({x: 110, y: paper.height() - 10})
    yAxis.startPoint({x: 10, y: paper.height() - 10})
    yAxis.endPoint({x: 10, y: paper.height() - 110})

    xTriangle.addPoint({x: 110, y: paper.height() - 6})
    xTriangle.addPoint({x: 115, y: paper.height() - 10})
    xTriangle.addPoint({x: 110, y: paper.height() - 14})

    yTriangle.addPoint({x: 6, y: paper.height() - 110})
    yTriangle.addPoint({x: 14, y: paper.height() - 110})
    yTriangle.addPoint({x: 10, y: paper.height() - 115})

    paper.draw(xAxis)
    paper.draw(yAxis)
    paper.draw(xTriangle)
    paper.draw(yTriangle)
  }

  return {
    init: init,
    draw: draw
  }
})