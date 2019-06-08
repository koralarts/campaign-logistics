const chalk = require('chalk')

const calculateDistance = (lat1, long1, lat2, long2, unit = 'K') => {
  const radlat1 = Math.PI * lat1/180
  const radlat2 = Math.PI * lat2/180
  const theta = long1 - long2
  const radtheta = Math.PI * theta/180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) *
    Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515

  if (unit === 'K') {
    dist = dist * 1.609344
  }

  if (unit === 'M') {
    dist = dist * 0.8684
  }

  return dist
}

const renderRoute = route => {
  let totalDistance = 0

  route.forEach((step) => {
    console.log(`${step.city.city}`)
    totalDistance += step.distance
  })

  console.log(chalk.green(totalDistance))
}

const removeCity = (cityList, cityToRemove) =>
  cityList.filter(city => city.city !== cityToRemove.city)

const getDistances = (fromCity, toCities) => toCities.map(city => ({
  city,
  distance: calculateDistance(fromCity.lat, fromCity.long, city.lat, city.long)
}))

module.exports = {
  calculateDistance,
  renderRoute,
  removeCity,
  getDistances
}
