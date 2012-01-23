define(['jquery', './../vendor/poirot', './../models/film'], function ($, poirot, Film) {

  var container

  var init = function () {
    container = $('#film-view-container')
    bindDomEvents()
    bindModelEvents()
  }

  var bindDomEvents = function () {
    
  }

  var bindModelEvents = function () {
    Film.on('selected', draw)
  }

  var draw = function (film) {
    container.html(poirot.filmView(film.attributes))
  }

  return {
    init: init
  }
})