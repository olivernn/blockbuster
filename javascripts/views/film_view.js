define(['jquery', './../vendor/poirot', './../models/film'], function ($, poirot, Film) {

  var container

  var init = function () {
    container = $('#film-view-container')
    Film.on('selected', draw)
  }

  var draw = function (film) {
    container.html(poirot.filmView(film.attributes))
  }

  return {
    init: init
  }
})