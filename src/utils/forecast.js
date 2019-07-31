
const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cad9dd0066c061e07e058e4c4059af65/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=auto'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const data = body.daily.data[0].summary + ' It is currently ' +
            body.currently.temperature + ' degrees out.'+ ' The higher temperature today is '+
            body.daily.data[0].temperatureHigh +' degres, with a lower of '+
            body.daily.data[0].temperatureLow +'. There is a ' +
            body.currently.precipProbability + '% chance of rain.'
            
            callback(undefined, data)
        }
    })

}

module.exports = forecast

//////////////////////////////// Before destructuring and shorthanding

// const forecast = (latitude,longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/cad9dd0066c061e07e058e4c4059af65/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''
//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback(response.body.error, undefined)
//         } else {
//             const data = {
//                 timeZone: response.body.timezone,
//                 summary: response.body.hourly.summary,
//                 lowTemperature: response.body.daily.data[0].temperatureLow,
//                 highTemperature: response.body.daily.data[0].temperatureHigh
//             }
//             callback(undefined, data)
//         }
//     })
// }

/////////////////////////////////

// const url = 'https://api.darksky.net/forecast/cad9dd0066c061e07e058e4c4059af65/37.8267,-122.4233'

// request({ url: url}, (error, response) => {
//     data = JSON.parse(response.body)
//     console.log(data.currently)
// })

// request({ url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log(response.body.error)
//     } else {
//         console.log('It is '+ chalk.red(response.body.currently.apparentTemperature) + ' degrees' )
//     }
// })

