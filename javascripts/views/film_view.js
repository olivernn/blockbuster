define(['jquery', './../vendor/poirot', './../models/film'], function ($, poirot, Film) {

  var container, film

  var init = function () {
    container = $('#film-view-container')
    bindDomEvents()
    bindModelEvents()
  }

  var bindDomEvents = function () {
    container
      .delegate('form', 'change', findSimilarFilms)
  }

  var bindModelEvents = function () {
    Film.on('selected', draw)
  }

  var findSimilarFilms = function () {
    var fieldValues = $(this).serializeArray().map(function (field) { return field.value })
    console.log(fieldValues)
    if (fieldValues.length) {
      Film.findSimilarTo(film, fieldValues)
    };
  }

  var draw = function (f) {
    film = f
    container.html(poirot.filmView(film.attributes))
  }

  return {
    init: init
  }
})