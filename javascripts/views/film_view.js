define(['jquery', './../vendor/poirot', './../lib/event_stream'], function ($, poirot, eventStream) {

  var film, container

  var init = function () {
    container = $('#film-view-container')
  }

  var draw = function (f) {
    film = f
    container.html(poirot.filmView(film.attributes))
  }

  eventStream.on('film:selected', draw)

  return {
    init: init,
    draw: draw
  }
})