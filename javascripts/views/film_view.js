define(['jquery', './../vendor/poirot', './../models/film', './../lib/jquery.draggable'], function ($, poirot, Film) {

  var containerSelector = '#film-view-container'

  var FilmView = function (film) {
    this.container = $(containerSelector)
    this.film = film
    this.film
      .on('deselected', this.close.bind(this))
  }

  FilmView.prototype = {
    render: function () {
      var attributes = this.film.attributes
      attributes.story_class = this.film.normalizedStory().replace(/\s/g, '-')
      this.html = poirot.filmView(this.film.attributes)
      this.html
        .delegate('form', 'change', this.findSimilarFilms.bind(this))
        .delegate('section header', 'click', this.activateSection.bind(this))
        .delegate('.close', 'click', this.deselect.bind(this))
        .draggable({dragHandle: 'header'})

      this.container.html(this.html)
    },

    findSimilarFilms: function (e) {
      var fieldValues = this.html.find('form').serializeArray().map(function (field) { return field.value })
      Film.findSimilarTo(this.film, fieldValues)
    },

    activateSection: function (e) {
      e.preventDefault()
      var header = $(e.target)
      this.html.find('.active').removeClass('active')
      header.parents('section').addClass('active')
    },

    deselect: function (e) {
      e.preventDefault()
      this.film.deselect()
    },

    close: function () {
      this.html.empty()
    }
  }

  return FilmView
})