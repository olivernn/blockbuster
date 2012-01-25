define(['jquery', './../vendor/poirot', './../models/film'], function ($, poirot, Film) {

  var containerSelector = '#film-view-container'

  var FilmView = function (film) {
    this.container = $(containerSelector)
    this.film = film
  }

  FilmView.prototype = {
    render: function () {
      this.html = poirot.filmView(this.film.attributes)
      this.html
        .delegate('form', 'change', this.findSimilarFilms.bind(this))

      this.container.html(this.html)
    },

    findSimilarFilms: function (e) {
      var fieldValues = this.html.find('form').serializeArray().map(function (field) { return field.value })
      if (fieldValues.length) {
        Film.findSimilarTo(this.film, fieldValues)
      }
    }
  }

  return FilmView
})