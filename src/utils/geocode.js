const request = require('request')

//Geocoding
//Address => lat/long => Weather

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoMDkxOTk4IiwiYSI6ImNramxtdm0xdDBucG0zMG1qMnE5bmpwMDgifQ.mAR0HIUSR9GlYpy1qsV6kw&Limit=1'

  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to location services', undefined)
    } else if(body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode