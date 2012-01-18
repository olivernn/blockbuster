define(['jquery', './../vendor/poirot', './../models/film'], function ($, poirot, Film) {

  var container

  var init = function () {
    container = $('#film-list-view-container')
    Film.on('searchResults', draw)
    draw(Film.all())
  }

  var draw = function (films) {
    container.html(poirot.filmListView({films: films.map(function (f) { return f.attributes }) }))
  }

  return {
    init: init
  }
})