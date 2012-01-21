define(['jquery', './../vendor/poirot', './../models/film'], function ($, poirot, Film) {

  var container

  var init = function () {
    container = $('#film-list-view-container')

    bindDomEvents()
    bindFilmEvents()

    draw(Film.all())
  }

  var getFilmAnd = function (method) {
    return function () {
      var id = $(this).data('film-id')
      Film.find(id)[method]()
    }
  }

  var bindDomEvents = function () {
    container
      .delegate('li', 'mouseover', getFilmAnd('highlight'))
      .delegate('li', 'mouseout', getFilmAnd('unhighlight'))
  }

  var bindFilmEvents = function () {
    Film.on('searchResults', draw)
  }

  var draw = function (films) {
    container.html(poirot.filmListView({films: films.map(function (f) { return f.attributes }) }))
  }

  return {
    init: init
  }
})