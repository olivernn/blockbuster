require([
  'domReady!',
  './views/scatter_graph',
  './models/film',
  './views/film_view',
  './views/film_list_view',
  './views/search_view',
  './views/radar_graph'
], function (d, scatterGraph, Film, FilmView, filmListView, searchView, radarGraph) {
  scatterGraph.init()
  searchView.init()

  Film.load(function () {
    filmListView.init()
    scatterGraph.draw(Film.all())
    radarGraph.init()
    radarGraph.draw(Film.all())
    // radarGraph.draw([Film.first()])
  })

  Film.on('searchResults', radarGraph.draw)

  Film.on('selected', function (film) {
    var filmView = new FilmView (film)
    filmView.render()
  })
})