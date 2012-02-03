define(['jquery', 'vendor/poirot', 'models/film', 'lib/jquery.draggable'], function ($, poirot, Film) {

  var containerSelector = '#film-view-container'

  var filmPresenter = function (film) {
    return $.extend({}, film.attributes, {
      story_class: film.normalizedStory().replace(/\s/g, '-'),
      has_oscars: !!film.attr('oscars'),
      has_baftas: !!film.attr('baftas')
    })
  }

  var FilmView = function (film) {
    this.container = $(containerSelector)
    this.film = film
    this.film
      .on('deselected', this.close.bind(this))
  }

  FilmView.prototype = {
    render: function () {
      this.html = poirot.filmView(filmPresenter(this.film))
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
      this.container.empty()
    }
  }

  return FilmView
})