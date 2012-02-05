define(['jquery', 'vendor/poirot', 'models/film'], function ($, poirot, Film) {

  var container, html

  var init = function () {
    container = $('#search-container')
    render()
    bindToDomEvents()
  }

  var render = function () {
    html = poirot.search()
    container.html(html)
  }

  var bindToDomEvents = function () {
    container
      .delegate('form', 'submit', handleSearch)
  }

  var handleSearch = function (e) {
    e.preventDefault()
    var query = $(this).find('input').val()
    query ? Film.search(query) : Film.resetSearch()
  }

  return {
    init: init
  }
})
