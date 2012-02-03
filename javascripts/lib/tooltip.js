define(['jquery', 'models/axis', 'vendor/poirot'], function ($, axis, poirot) {

  var elem

  var generateFilmAttrs = function (film) {
    return {
      story_class: film.normalizedStory().replace(/\s/g, '-'),
      title: film.attr('title'),
      x_name: axis.x.name(),
      x_val: film.attr(axis.x.name()),
      y_name: axis.y.name(),
      y_val: film.attr(axis.y.name())
    }
  }

  var show = function (film, pos) {
    elem = poirot.tooltip(generateFilmAttrs(film)).css({left: pos.x + 10, top: pos.y + 10})
    $(document.body).append(elem)
  }

  var hide = function () {
    elem.fadeOut(200)
  }

  return {
    show: show,
    hide: hide
  }
})