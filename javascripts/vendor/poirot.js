define(['jquery', './handlebars', './../lib/handlebars_helpers'], function ($, Handlebars) {
  viewFactory = function (template, partials) {
    var compiledTemplate = Handlebars.compile(template)
    return function (data) {
      return $(compiledTemplate(data))
    }
  }

  var poirot = {
    partials: {},
    _viewFactory: viewFactory
  }

  $(document).ready(function () {
    $('script[type="text/mustache"]').each(function () {
      var template = $(this).text()
      var methodName = this.id.replace(/-([a-z])/g, function (str) {
        return str.replace("-", "").toUpperCase()
      }).replace("Template", "")

      poirot.partials[methodName] = template

      poirot[methodName] = poirot._viewFactory(template, poirot.partials)
    })
  })

  return poirot
})
