define(function () {

  Date.prototype.weekNumber = function () {
    var janone = new Date (this.getFullYear(), 0, 1)
    return Math.ceil((((this - janone) / 86400000) + janone.getDay() + 1) / 7);
  }

  return Date
})