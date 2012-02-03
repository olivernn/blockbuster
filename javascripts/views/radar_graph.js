define(['jquery', 'lib/svg', 'models/film', 'lib/story_color'], function ($, SVG, Film, storyColor) {

  var elem, paper, group

  var angleStep = (2 * Math.PI) / 5

  var prongs = [
    {
      attrName: 'audience_score'
    },{
      attrName: 'budget',
      log: true,
      transform: function (n) { return Math.log(n) }
    },{
      attrName: 'worldwide_gross',
      log: true,
      transform: function (n) { return Math.log(n) }
    },{
      attrName: 'number_of_theatres_in_opening_weekend'
    },{
      attrName: 'profitability',
      log: true,
      transform: function (n) { return Math.log(n) }
    }
  ]

  var init = function () {
    elem = $('#radar-graph')
    paper = new SVG.Doc (document.getElementById('radar-graph'))
    polygons = new SVG.Group ({transform: 'translate(80, 80)'})

    Film
      .on('loaded', draw)

    prongs.forEach(function (prong) {
      prong.maxValue = Math.max.apply(null, Film.map(prong.max || function (f) { return f.attr(prong.attrName)}))
      if (prong.log) prong.maxValue = Math.log(prong.maxValue)
      prong.unit = 75 / prong.maxValue
    })

    paper.draw(polygons)
  }

  var draw = function (films) {
    polygons.empty()
    films.forEach(drawFilm)
    drawAxis()
  }

  var drawAxis = function () {
    prongs.forEach(function (prong, idx) {
      var axis = new SVG.Line({stroke: '#111', 'stroke-width': 3})
      axis.startPoint({x: 0, y: 0})
      axis.endPoint(rotatePoint({x: 0, y: 75}, angleStep * idx))
      axis.on('mouseover', function () {
        console.log(prong.attrName)
      })
      polygons.add(axis)
    })
  }

  var drawFilm = function (film) {
    var polygon = new SVG.Polygon ({stroke: storyColor.forFilm(film), fill: 'transparent', 'stroke-width': 2})

    prongs.forEach(function (prong, idx) {
      var transformer = prong.transform || (function (n) { return n }),
          value = prong.unit * transformer(film.attr(prong.attrName)),
          point = rotatePoint({x: 0, y: value}, angleStep * idx)

      polygon.addPoint(point)
    })

    polygon.on('mouseover', function () {
      film.highlight()
    })
    polygon.on('mouseout', function () {
      setTimeout(film.unhighlight(), 600)
    })

    polygons.add(polygon)
  }

  var rotatePoint = function (point, angle) {
    return {
      x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
      y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
    }
  }

  return {
    init: init,
    draw: draw
  }

})