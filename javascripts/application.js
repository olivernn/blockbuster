require([
  'domReady!',
  './views/scatter_graph',
  './models/film',
  './views/film_view',
  './views/film_list_view',
  './views/search_view'
], function (d, scatterGraph, Film, FilmView, filmListView, searchView) {
  scatterGraph.init()
  searchView.init()

  Film.load(function () {
    filmListView.init()
    scatterGraph.draw(Film.all())
  })

  Film.on('selected', function (film) {
    var filmView = new FilmView (film)
    filmView.render()
  })
})