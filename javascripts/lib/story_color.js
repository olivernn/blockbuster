define(function () {

  var colors = {
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

  var getColorForFilm = function (film) {
    return colors[film.normalizedStory()]
  }

  return {
    forFilm: getColorForFilm
  }
})