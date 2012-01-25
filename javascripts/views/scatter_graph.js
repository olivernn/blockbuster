define(['jquery', './../lib/svg', './scatter_graph_circle', './../lib/jquery.zoomable', './../models/film', './scatter_graph_path'], function ($, SVG, ScatterGraphCircle, _, Film, ScatterGraphPath) {

  var  elem, circleGroup, pathGroup

  var init = function (mx, my) {
    elem = $(document.querySelector('svg'))
    paper = new SVG.Doc(document.querySelector('svg'))
    circleGroup = new SVG.Group
    pathGroup = new SVG.Group

    circleGroup.attr('width', paper.width())
    circleGroup.attr('height', paper.height())
    pathGroup.attr('width', paper.width())
    pathGroup.attr('height', paper.height())

    circleGroup.add(pathGroup)

    elem.zoomable(circleGroup)

    Film
      .on('loaded', draw)
      .on('similaritySearch', removePaths)
  }

  var draw = function (films) {
    films.forEach(function (film) {
      var circle = new ScatterGraphCircle (film).toElem()
      circleGroup.add(circle)

      film.on('similarTo', function (otherFilm) {
        var path = new ScatterGraphPath (film, otherFilm).toElem()
        pathGroup.add(path)
      })
    })

    paper.draw(circleGroup)
  }

  var removePaths = function () {
    pathGroup.empty()
  }

  return {
    init: init,
    draw: draw
  }
})