const chalk = require('chalk')
const csv = require('csv-parser')
const fs = require('fs')
const { head, tail, last, sortBy } = require('lodash')
const City = require('./city')
const { renderRoute, removeCity, getDistances } = require('./utils')

const allCities = []

const alwaysClosest = (citiesQueue, route = []) => {
  if (citiesQueue.length === 0) {
    const firstCity = head(route)
    const lastCity = last(route)
    route.push({
      distance: City.calculateDistance(firstCity.city, lastCity.city),
      city: firstCity.city
    })
    return route
  }

  let currentCity

  if (route.length === 0) {
    currentCity = head(citiesQueue)
    route.push({
      distance: 0,
      city: currentCity
    })
    return alwaysClosest(tail(citiesQueue), route)
  } else {
    currentCity = last(route)
  }

  const cityDistances = getDistances(currentCity.city, citiesQueue)
  const sortedDistances = sortBy(cityDistances, ['distance'])
  const closestCity = head(sortedDistances)
  const newCityQueue = removeCity(citiesQueue, closestCity.city)
  route.push(closestCity)

  return alwaysClosest(newCityQueue, route)
}

fs.createReadStream('cities_all.csv')
  .pipe(csv())
  .on('data', (row) => {
    allCities.push(new City(row.City, row.State, row.Latitude, row.Longitude))
  })
  .on('end', () => {
    console.log(`${chalk.green('Processed')}: ${allCities.length} rows`)

    const alwaysClosestRoute = alwaysClosest(allCities)
    renderRoute(alwaysClosestRoute)
  });
