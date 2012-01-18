require([
  'domReady!',
  './views/scatter_graph',
  './models/film',
  './views/film_view',
  './views/film_list_view'
], function (d, scatterGraph, Film, filmView, filmListView) {
  scatterGraph.init()

  Film.load(function () {
    filmView.init()
    filmListView.init()
    scatterGraph.draw(Film.all())
  })
})