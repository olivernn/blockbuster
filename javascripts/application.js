require(['domReady!', './views/scatter_graph', './models/film', './views/film_view'], function (d, scatterGraph, Film, filmView) {
  scatterGraph.init()
  filmView.init()

  Film.load(function () {
    scatterGraph.draw(Film.all())
  })
})