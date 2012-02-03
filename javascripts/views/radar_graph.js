define(['jquery', 'lib/svg', 'models/film'], function ($, SVG, Film) {

  var storyColor = {
    'discovery': 'rgb(122,73,28)',
    'escape': 'rgb(125, 0, 83)',
    'journey and return': 'rgb(199,200,202)',
    'comedy': 'rgb(34,164,151)',
    'quest': 'rgb(144,200,133)',
    'sacrifice': 'rgb(98,29,129)',
    'wretched excess': 'rgb(89,90,93)',
    'fish out of water': 'rgb(213,202,164)',
    'maturation': 'rgb(204,56,33)',
    'pursuit': 'rgb(161,71,141)',
    'rivalry': 'rgb(66,171,72)',
    'underdog': 'rgb(144,25,26)',
    'love': 'rgb(144,200,133)',
    'monster force': 'rgb(231,4,28)',
    'revenge': 'rgb(112,183,50)',
    'transformation': 'rgb(169,147,38)',
    'metamorphosis': 'rgb(69,70,72)',
    'rescue': 'rgb(231,50,128)',
    'tragedy': 'rgb(177,114,33)',
    'rags to riches': 'rgb(49,60,146)',
    'the riddle': 'rgb(152,203,194)',
    'temptation': 'rgb(211,147,126)'
  }

  var elem, paper, group

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
  }

  var drawFilm = function (film) {
    var polygon = new SVG.Polygon ({stroke: storyColor[film.normalizedStory()], fill: 'transparent'}),
        angleStep = (2 * Math.PI) / 5

    prongs.forEach(function (prong, idx) {
      var transformer = prong.transform || (function (n) { return n }),
          value = prong.unit * transformer(film.attr(prong.attrName)),
          point = rotatePoint({x: 0, y: value}, angleStep * idx)

      polygon.addPoint(point)
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