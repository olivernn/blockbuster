define(['./../vendor/handlebars'], function (Handlebars) {
  Handlebars.registerHelper('secondsToTime', function (sec) {
    var hours = parseInt(sec / 3600, 10),
        minutes = parseInt((sec - (hours * 3600)) / 60, 10)

    var pad = function (num) {
      var string = num + ""
      if (string.length === 2) return string
      return pad("0" + string)
    }

    return hours + "hrs " + pad(minutes) + "mins"
  })

  Handlebars.registerHelper('millionDollars', function (num) {
    return ["$ ", num, "m"].join('')
  })
})