const request = require('request')

//Weather Api

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherapi.com/v1/forecast.json?key=aacd766733724eb48f5142151210601&q='+ latitude +','+ longitude +'&days=10&limit=10'

  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather services', undefined)
    }else if (body.error) {
      callback('Unable to find forecast. Try another search', undefined)
    }else {
      callback(undefined, body.forecast.forecastday[0].day.condition.text + '. It is currently ' + body.current.temp_c + ' degrees out. There is ' + body.forecast.forecastday[0].day.daily_chance_of_rain + ' % chance of rain ')
    }
})
}

module.exports = forecast