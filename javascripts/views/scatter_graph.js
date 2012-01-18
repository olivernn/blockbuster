define(['jquery', './../lib/svg', './scatter_graph_circle', './../lib/jquery.zoomable'], function ($, SVG, ScatterGraphCircle, eventStream) {

  var  elem, circleGroup

  var init = function (mx, my) {
    elem = $(document.querySelector('svg'))
    paper = new SVG.Doc(document.querySelector('svg'))
    circleGroup = new SVG.Group

    circleGroup.attr('width', paper.width())
    circleGroup.attr('height', paper.height())

    elem.zoomable(circleGroup)
  }

  var draw = function (films) {
    films.forEach(function (film) {
      var circle = new ScatterGraphCircle (film).toElem()
      circleGroup.add(circle)
    })
    paper.draw(circleGroup)
  }

  return {
    init: init,
    draw: draw
  }
})