define(['models/film'], function (Film) {

  var collection = []
  
  var AxisAttribute = function (attributes) {
    this.attributes = attributes
    collection.push(this)
  }

  AxisAttribute.find = function (name) {
    return collection.filter(function (aa) {
      return aa.name() == name
    })[0]
  }
  
  AxisAttribute.all = function () {
    return collection.slice()
  }
  
  AxisAttribute.map = function () {
    return Array.prototype.map.apply(collection, arguments)
  }

  AxisAttribute.prototype = {
    name: function () {
      return this.attributes.name
    },
  
    isLog: function () {
      return !!this.attributes.isLog
    },
  
    max: function () {
      var max = Math.max.apply(null, Film.pluck(this.name()))
  
      if (this.isLog()) {
        return Math.log(max * 1000)
      } else {
        return max
      };
    },
  
    valueForFilm: function (film) {
      if (this.isLog()) {
        return Math.log(film.attr(this.name()) * 1000)
      } else {
        return film.attr(this.name())
      }
    }
  }

  var axisAttributes = [{
    name: 'profitability',
    isLog: true
  },{
    name: 'budget',
    isLog: true
  }, {
    name: 'worldwide_gross',
    isLog: true
  }, {
    name: 'domestic_gross',
    isLog: true
  }, {
    name: 'foreign_gross',
    isLog: true
  }, {
    name: 'box_office_average_per_cinema',
    isLog: true
  }, {
    name: 'number_of_theatres_in_opening_weekend',
    isLog: false
  }, {
    name: 'audience_score',
    isLog: false
  }, {
    name: 'rotten_tomatoes',
    isLog: false
  }, {
    name: 'runtime',
    isLog: false
  }, {
    name: 'release_year_day',
    isLog: false
  }]

  axisAttributes.forEach(function (axisAttribute) {
    new AxisAttribute (axisAttribute)
  })

  return AxisAttribute
})