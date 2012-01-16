define(['./../lib/svg', './../lib/tooltip', './../lib/event_stream'], function (SVG, tooltip, eventStream) {

  var paper

  var storyColor = {
    'Discovery': 'rgb(122,73,28)',
    'Escape': 'rgb(125, 0, 83)',
    'Journey & Return': 'rgb(199,200,202)',
    'Comedy': 'rgb(34,164,151)',
    'Quest': 'rgb(144,200,133)',
    'Sacrifice': 'rgb(98,29,129)',
    'Wretched Excess': 'rgb(89,90,93)',
    'Fish Out Of Water': 'rgb(213,202,164)',
    'Maturation': 'rgb(204,56,33)',
    'Pursuit': 'rgb(161,71,141)',
    'Rivalry': 'rgb(66,171,72)',
    'Underdog': 'rgb(144,25,26)',
    'Love': 'rgb(144,200,133)',
    'Monster Force': 'rgb(231,4,28)',
    'Revenge': 'rgb(112,183,50)',
    'Transformation': 'rgb(169,147,38)',
    'Metamorphosis': 'rgb(69,70,72)',
    'Rescue': 'rgb(231,50,128)',
    'Tragedy': 'rgb(177,114,33)',
    'Rags To Riches': 'rgb(49,60,146)',
    'The Riddle': 'rgb(152,203,194)',
    'Temptation': 'rgb(211,147,126)'
  }

  var filmToCircle = function (film) {
    return new SVG.Circle ({
      'cx': film.attr('worldwide_gross') * 2,
      'cy': film.attr('budget') * 2,
      'r': 2,
      'fill': storyColor[film.attr('story')],
      'fill-opacity': 0.75,
      'stroke': 'none',
      'class': 'film'
    })
  }

  var init = function () {
    paper = new SVG.Doc(document.querySelector('svg'))
  }

  var draw = function (films) {
    films.forEach(drawFilm)
  }

  var drawFilm = function (film) {
    var circle = filmToCircle(film)

    eventStream.on('film:selected', function (f) {
      if (f === film) return
      circle.animate('r', {to: 2, dur: '1s', fill: 'freeze'})
    })

    film.on('filter:included', function () {
      circle.animate('r', {to: 10, dur: '1s', fill: 'freeze'})
    })

    film.on('filter:excluded', function () {
      circle.animate('r', {to: 2, dur: '1s', fill: 'freeze'})
    })

    circle
      .on('mouseout', function (e) {
        tooltip.hide()
      })
      .on('mouseover', function (e) {
        tooltip.show(film.attr('title'), {x: e.clientX, y: e.clientY})
      })
      .on('click', function (e) {
        circle.animate('r', {to: 10, dur: '1s', fill: 'freeze'})
        eventStream.emit('film:selected', film)
      })

    paper.draw(circle)
  }

  return {
    init: init,
    draw: draw
  }
})