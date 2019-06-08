const { calculateDistance } = require('./utils')

class City {
  static calculateDistance(city1, city2) {
    return calculateDistance(city1.lat, city1.long, city2.lat, city2.long)
  }

  constructor(city, state, lat, long) {
    this.city = city
    this.state = state
    this.lat = lat
    this.long = long
  }
}

module.exports = City
