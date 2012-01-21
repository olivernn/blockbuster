require([
  'domReady!',
  './views/scatter_graph',
  './models/film',
  './views/film_view',
  './views/film_list_view',
  './views/search_view'
], function (d, scatterGraph, Film, filmView, filmListView, searchView) {
  scatterGraph.init()
  searchView.init()

  Film.load(function () {
    filmView.init()
    filmListView.init()
    scatterGraph.draw(Film.all())
  })
})