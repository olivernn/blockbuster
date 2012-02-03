define(['vendor/handlebars'], function (Handlebars) {
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

  Handlebars.registerHelper('humanize', function (str) {
    var capitalizer = function (match) {
      return match.toUpperCase()
    }

    return str
      .replace(/_/g, ' ')
      .replace(/^\D/g, capitalizer)
      .replace(/\s\D/g, capitalizer)
  })

  Handlebars.registerHelper('sentence', function (arr) {
    if (!arr) return
    return [arr.slice(0, -1).join(', '), arr[arr.length - 1]].join(' &amp; ')
  })

  Handlebars.registerHelper('round2', function (n) {
    return parseInt(n, 10).toFixed(2)
  })

  Handlebars.registerHelper('percentage', function (n) {
    return [parseInt(n, 10).toFixed(2), '%'].join('')
  })

  Handlebars.registerHelper('date', function (d) {
    return d.toDateString()
  })
})