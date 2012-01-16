var graph = (function () {

  var ctx, canvas

  var init = function () {
    canvas = document.getElementById('graph')
    ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'black'
  }

  var draw = function (points) {
    points.forEach(drawPoint)
  }

  var drawPoint = function (point) {
    ctx.strokeStyle = strokeStyle[point.color] || 'black'
    ctx.beginPath()
    ctx.moveTo(point.x - 3, point.y + 3)
    ctx.lineTo(point.x + 3, point.y - 3)
    ctx.moveTo(point.x + 3, point.y + 3)
    ctx.lineTo(point.x - 3, point.y - 3)
    ctx.stroke()
  }

  var strokeStyle = {
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

  return {
    init: init,
    draw: draw
  }
})()